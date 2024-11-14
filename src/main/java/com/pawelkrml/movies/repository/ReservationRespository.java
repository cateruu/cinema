package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Reservation;

public interface ReservationRespository extends JpaRepository<Reservation, UUID> {
}
