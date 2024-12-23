package com.pawelkrml.movies.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

public class ReservationResponseDTO {
  private UUID id;
  private List<String> tickets;
  private String movieName;
  private BigDecimal price;
  private String roomName;
  private LocalDateTime playingTime;
  private UUID userId;
  private String thumnbnailUrl;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public ReservationResponseDTO() {
  };

  public ReservationResponseDTO(UUID id, List<String> tickets, String movieName, BigDecimal price, String roomName,
      LocalDateTime playingTime, UUID userId, LocalDateTime createdAt, LocalDateTime updatedAt) {
    this.id = id;
    this.tickets = tickets;
    this.movieName = movieName;
    this.price = price;
    this.roomName = roomName;
    this.playingTime = playingTime;
    this.userId = userId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public List<String> getTickets() {
    return this.tickets;
  }

  public void setTickets(List<String> tickets) {
    this.tickets = tickets;
  }

  public String getMovieName() {
    return this.movieName;
  }

  public void setMovieName(String name) {
    this.movieName = name;
  }

  public BigDecimal getPrice() {
    return this.price;
  }

  public void setPrice(BigDecimal price) {
    this.price = price;
  }

  public String getRoomName() {
    return this.roomName;
  }

  public void setRoomName(String name) {
    this.roomName = name;
  }

  public LocalDateTime getPlayingTime() {
    return this.playingTime;
  }

  public void setPlayingTime(LocalDateTime time) {
    this.playingTime = time;
  }

  public UUID getUserId() {
    return this.userId;
  }

  public String getThumbnailUrl() {
    return this.thumnbnailUrl;
  }

  public void setThumbnailUrl(String url) {
    this.thumnbnailUrl = url;
  }

  public void setUserId(UUID id) {
    this.userId = id;
  }

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime time) {
    this.createdAt = time;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(LocalDateTime time) {
    this.updatedAt = time;
  }
}
