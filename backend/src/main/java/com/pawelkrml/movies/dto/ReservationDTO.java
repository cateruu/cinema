package com.pawelkrml.movies.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Pattern;

public class ReservationDTO {
  @NotEmpty(message = "tickets array cannot be empty.")
  private List<@Pattern(regexp = "\\b[1-9]?\\d-[A-Z]\\b", message = "ticket have to be in the format of: [1-99]-[A-Z]") String> tickets;

  @NotEmpty(message = "userId has to be present.")
  private String userId;

  @NotEmpty(message = "roomId has to be present.")
  private String roomId;

  public List<String> getTickets() {
    return this.tickets;
  }

  public void setTickets(List<String> tickets) {
    this.tickets = tickets;
  }

  public String getUserId() {
    return this.userId;
  }

  public void setUserId(String userId) {
    this.userId = userId;
  }

  public String getRoomId() {
    return this.roomId;
  }

  public void setRoomId(String roomId) {
    this.roomId = roomId;
  }
}
