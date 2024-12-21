package com.pawelkrml.movies.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pawelkrml.movies.model.Reservation;

import jakarta.transaction.Transactional;

public interface ReservationRespository extends JpaRepository<Reservation, UUID> {
  @Query(value = "SELECT * FROM reservations WHERE schedule_id = :scheduleId", nativeQuery = true)
  public List<Reservation> getAllForScheduleId(@Param("scheduleId") UUID scheduleId);

  @Modifying
  @Transactional
  @Query(value = "DELETE FROM reservations WHERE schedule_id = :scheduleId", nativeQuery = true)
  public void deleteAllByScheduleId(@Param("scheduleId") UUID scheduleId);
}
