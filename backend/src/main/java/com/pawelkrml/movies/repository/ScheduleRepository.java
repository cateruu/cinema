package com.pawelkrml.movies.repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, UUID> {
  public List<Schedule> findAllByMovieId(UUID movieId);

  public List<Schedule> findAllByRoomId(UUID roomId);

  public List<Schedule> findAllByRoomIdAndPlayingTimeBetween(
      UUID roomId,
      LocalDateTime startTime,
      LocalDateTime endTime);
}
