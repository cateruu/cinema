package com.pawelkrml.movies.dto;

import java.time.LocalDateTime;
import java.util.UUID;

public class RoomDTO {
  private String name;
  private LocalDateTime playingTime;
  private UUID playingMovieId;

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public LocalDateTime getPlayingTime() {
    return playingTime;
  }

  public void setPlayingTime(LocalDateTime playingTime) {
    this.playingTime = playingTime;
  }

  public UUID getPlayingMovieId() {
    return playingMovieId;
  }

  public void setPlayingMovieId(UUID playingMovieId) {
    this.playingMovieId = playingMovieId;
  }
}
