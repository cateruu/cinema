package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Seat;

public interface SeatRespository extends JpaRepository<Seat, Long> {
  public void deleteAllByRoomId(UUID roomId);
}
