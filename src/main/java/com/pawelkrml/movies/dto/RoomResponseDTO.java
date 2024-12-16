package com.pawelkrml.movies.dto;

import java.util.List;

import com.pawelkrml.movies.model.Room;

public class RoomResponseDTO {
  private Room room;
  private List<String> availableSeats;
  private int capacity;
  private int rows;

  public RoomResponseDTO(Room room, List<String> availableSeats, int capacity) {
    this.room = room;
    this.availableSeats = availableSeats;
    this.capacity = capacity;
  }

  public RoomResponseDTO(Room room, List<String> availableSeats, int capacity, int rows) {
    this.room = room;
    this.availableSeats = availableSeats;
    this.capacity = capacity;
    this.rows = rows;
  }

  public Room getRoom() {
    return this.room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public List<String> getAvailableSeats() {
    return this.availableSeats;
  }

  public void setAvailableSeats(List<String> availableSeats) {
    this.availableSeats = availableSeats;
  }

  public int getCapacity() {
    return this.capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }

  public int getRows() {
    return this.rows;
  }

  public void setRows(int rows) {
    this.rows = rows;
  }
}
