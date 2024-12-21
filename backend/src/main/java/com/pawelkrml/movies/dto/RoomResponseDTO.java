package com.pawelkrml.movies.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.pawelkrml.movies.model.Room;

public class RoomResponseDTO {
  private UUID id;
  private String name;
  private int rows;
  private int seats;
  private int capacity;
  private LocalDateTime createdAt;
  private LocalDateTime updatedAt;

  public RoomResponseDTO(Room room, int capacity) {
    this.id = room.getId();
    this.name = room.getName();
    this.rows = room.getRows();
    this.seats = room.getSeats();
    this.capacity = capacity;
    this.createdAt = room.getCreatedAt();
    this.updatedAt = room.getUpdatedAt();
  }

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
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

  public LocalDateTime getCreatedAt() {
    return this.createdAt;
  }

  public void setCreatedAt(LocalDateTime date) {
    this.createdAt = date;
  }

  public LocalDateTime getUpdatedAt() {
    return this.updatedAt;
  }

  public void setUpdatedAt(LocalDateTime date) {
    this.updatedAt = date;
  }

  public int getCapacity() {
    return this.capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }
}
