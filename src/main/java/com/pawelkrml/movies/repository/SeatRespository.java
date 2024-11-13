package com.pawelkrml.movies.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pawelkrml.movies.model.Seat;

public interface SeatRespository extends JpaRepository<Seat, Long> {
  public void deleteAllByRoomId(UUID roomId);

  @Query(value = "SELECT CONCAT(row, '-', seat) AS seatLabel FROM seats WHERE room_id = :roomId AND reserved = false", nativeQuery = true)
  public List<String> getSeatsForRoom(@Param("roomId") UUID roomId);

  public int countByRoomId(UUID roomId);
}
