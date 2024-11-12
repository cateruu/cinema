package com.pawelkrml.movies.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Seat;

public interface SeatRespository extends JpaRepository<Seat, Long> {
}
