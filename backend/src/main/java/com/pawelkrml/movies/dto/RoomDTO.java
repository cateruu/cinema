package com.pawelkrml.movies.dto;

import java.time.LocalDateTime;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

public class RoomDTO {
  @NotBlank
  private String name;
  private LocalDateTime playingTime;

  @Positive
  @Min(1)
  private int rows;

  @Positive
  @Min(1)
  @Max(26)
  private int seats;

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

  public int getRows() {
    return this.rows;
  }

  public void setRows(int rows) {
    this.rows = rows;
  }

  public int getSeats() {
    return this.seats;
  }

  public void setSeats(int seats) {
    this.seats = seats;
  }
}
