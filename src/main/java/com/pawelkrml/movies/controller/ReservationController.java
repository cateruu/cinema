package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.net.URI;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
  public ResponseEntity<List<ReservationResponseDTO>> getAllReservation() {
    return ResponseEntity.ok(reservationService.getAllReservations().stream()
        .map(reservation -> reservationService.tranformToResponseDto(reservation)).collect(Collectors.toList()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ReservationResponseDTO> getReservation(@PathVariable UUID id) {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UUID userId = userService.getUserByUsername(userDetails.getUsername()).getId();
    Reservation reservation = reservationService.getReservationById(id);

    if (userService.isOnlyUserRole(userDetails) && !userId.equals(reservation.getUser().getId())) {
      throw new AccessDeniedException("you do not have permission to access this resource.");
    }

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
    UUID userId = userService.getUserByUsername(userDetails.getUsername()).getId();
    Reservation reservation = reservationService.getReservationById(id);

    if (userService.isOnlyUserRole(userDetails) && !userId.equals(reservation.getUser().getId())) {
      throw new AccessDeniedException("you do not have permission to access this resource.");
    }

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

    reservationService.update(reservation);

    return ResponseEntity.ok(reservationService.tranformToResponseDto(reservation));
  }
}
