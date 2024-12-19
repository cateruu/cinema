package com.pawelkrml.movies.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.pawelkrml.movies.model.Movie;

public class ScheduleResponseDTO {
  private UUID id;
  private LocalDateTime playingTime;
  private Movie movie;
  private RoomResponseDTO room;

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public LocalDateTime getPlayingTime() {
    return this.playingTime;
  }

  public void setPlayingTime(LocalDateTime time) {
    this.playingTime = time;
  }

  public Movie getMovie() {
    return this.movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  public RoomResponseDTO getRoom() {
    return this.room;
  }

  public void setRoom(RoomResponseDTO room) {
    this.room = room;
  }
}
