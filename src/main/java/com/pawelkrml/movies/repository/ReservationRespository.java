package com.pawelkrml.movies.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pawelkrml.movies.model.Reservation;

public interface ReservationRespository extends JpaRepository<Reservation, UUID> {
  @Query(value = "SELECT * FROM reservations WHERE room_id = :roomId", nativeQuery = true)
  public List<Reservation> getAllForRoomId(@Param("roomId") UUID roomId);
}
