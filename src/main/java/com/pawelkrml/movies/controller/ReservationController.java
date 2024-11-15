package com.pawelkrml.movies.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.ReservationDTO;
import com.pawelkrml.movies.dto.ReservationResponseDTO;
import com.pawelkrml.movies.model.Reservation;
import com.pawelkrml.movies.service.ReservationService;
import com.pawelkrml.movies.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @Autowired
  private UserService userService;

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

    if (!userId.equals(reservation.getUser().getId())) {
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
}
