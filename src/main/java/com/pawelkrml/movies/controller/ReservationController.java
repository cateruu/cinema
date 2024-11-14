package com.pawelkrml.movies.controller;

import java.net.URI;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/reservations")
public class ReservationController {
  @Autowired
  private ReservationService reservationService;

  @GetMapping
  public ResponseEntity<List<ReservationResponseDTO>> getAllReservation() {
    return ResponseEntity.ok(reservationService.getAllReservations().stream()
        .map(reservation -> reservationService.tranformToResponseDto(reservation)).collect(Collectors.toList()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ReservationResponseDTO> getReservation(@PathVariable UUID id) {
    return ResponseEntity.ok(reservationService.tranformToResponseDto(reservationService.getReservationById(id)));
  }

  @PostMapping
  public ResponseEntity<ReservationResponseDTO> createReservation(@Valid @RequestBody ReservationDTO reservationDTO) {
    Reservation reservation = reservationService.createReservation(reservationDTO);

    return ResponseEntity.created(URI.create("/v1/reservations/" + reservation.getId()))
        .body(reservationService.tranformToResponseDto(reservation));
  }
}
