package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.PaginatedResponseDTO;
import com.pawelkrml.movies.dto.ReservationDTO;
import com.pawelkrml.movies.dto.ReservationResponseDTO;
import com.pawelkrml.movies.model.Reservation;
import com.pawelkrml.movies.service.ReservationService;
import com.pawelkrml.movies.service.SeatService;
import com.pawelkrml.movies.service.UserService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @Autowired
  private UserService userService;

  @Autowired
  private SeatService seatService;

  @GetMapping
  public ResponseEntity<PaginatedResponseDTO<ReservationResponseDTO>> getAllReservation(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy,
      @RequestParam(defaultValue = "desc") String direction) {
    Page<ReservationResponseDTO> reservationsPage = reservationService
        .tranformToPageResponseDto(reservationService.getAllReservations(page, size, sortBy, direction));

    return ResponseEntity.ok(PaginatedResponseDTO.from(reservationsPage));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ReservationResponseDTO> getReservation(@PathVariable UUID id) {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Reservation reservation = reservationService.getReservationById(id);

    userService.checkIfUserOwnsThatResource(userDetails, reservation.getUser().getId());

    return ResponseEntity.ok(reservationService.tranformToResponseDto(reservation));
  }

  @PostMapping
  public ResponseEntity<ReservationResponseDTO> createReservation(@Valid @RequestBody ReservationDTO reservationDTO) {
    Reservation reservation = reservationService.createReservation(reservationDTO);

    return ResponseEntity.created(URI.create("/v1/reservations/" + reservation.getId()))
        .body(reservationService.tranformToResponseDto(reservation));
  }

  @PatchMapping("/{id}")
  @Transactional
  public ResponseEntity<ReservationResponseDTO> upadteReservation(@PathVariable UUID id,
      @RequestBody Map<String, Object> updates) {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Reservation reservation = reservationService.getReservationById(id);

    userService.checkIfUserOwnsThatResource(userDetails, reservation.getUser().getId());

    updates.forEach((key, value) -> {
      try {
        Field field = reservation.getClass().getDeclaredField(key);
        field.setAccessible(true);
        if (key.equals("tickets")) {
          if (value instanceof List) {
            @SuppressWarnings("unchecked")
            List<String> valueList = (List<String>) value;
            boolean available = seatService.checkIfSeatsAvailable(valueList, reservation.getRoom().getId());

            if (available) {
              seatService.cancelSeatsReservation(reservation.getTickets(), reservation.getRoom().getId());
              seatService.reserveSeats(valueList, reservation.getRoom().getId());
            } else {
              throw new IllegalArgumentException("seats are already reserved.");
            }
          }
        }

        field.set(reservation, value);
      } catch (Exception e) {
        if (e.getMessage().contains("reserved")) {
          throw new IllegalArgumentException(e.getMessage());
        }

        throw new IllegalArgumentException("unknown key: " + key);
      }
    });

    reservation.setUpdatedAt(LocalDateTime.now());

    reservationService.update(reservation);

    return ResponseEntity.ok(reservationService.tranformToResponseDto(reservation));
  }
}
