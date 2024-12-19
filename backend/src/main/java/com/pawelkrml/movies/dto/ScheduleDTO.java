package com.pawelkrml.movies.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class ScheduleDTO {
  @NotNull(message = "cannot be empty")
  @FutureOrPresent(message = "must be present or future date")
  private LocalDateTime playingTime;

  @NotBlank(message = "cannot be empty")
  private String movieId;

  @NotBlank(message = "cannot be empty")
  private String roomId;

  public LocalDateTime getPlayingTime() {
    return this.playingTime;
  }

  public void setPlayingTime(LocalDateTime time) {
    this.playingTime = time;
  }

  public String getMovieId() {
    return this.movieId;
  }

  public void setMovieId(String id) {
    this.movieId = id;
  }

  public String getRoomId() {
    return this.roomId;
  }

  public void setRoomId(String id) {
    this.roomId = id;
  }
}
