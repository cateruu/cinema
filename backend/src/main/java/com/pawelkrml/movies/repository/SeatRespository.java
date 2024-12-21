package com.pawelkrml.movies.repository;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pawelkrml.movies.model.Seat;

public interface SeatRespository extends JpaRepository<Seat, Long> {
  public void deleteAllByScheduleId(UUID scheduleId);

  @Query(value = "SELECT CONCAT(row, '-', seat) AS seatLabel FROM seats WHERE schedule_id = :scheduleId AND reserved = false", nativeQuery = true)
  public List<String> getAvailableSeatsForSchedule(@Param("scheduleId") UUID scheduleId);

  public int countByScheduleId(UUID scheduleId);

  @Query(value = "SELECT * FROM seats WHERE row = :row AND seat = :seat AND schedule_id = :scheduleId", nativeQuery = true)
  public Seat getByRowBySeatByScheduleId(@Param("row") int row, @Param("seat") char seat,
      @Param("scheduleId") UUID scheduleId);

  @Query(value = "SELECT MAX(row) from seats WHERE schedule_id = :scheduleId", nativeQuery = true)
  public int getRowsNumberForScheduleId(@Param("scheduleId") UUID scheduleId);
}
