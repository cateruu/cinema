package com.pawelkrml.movies.dto;

import com.pawelkrml.movies.model.Room;

public class RoomResponseDTO {
  private Room room;
  private int capacity;

  public RoomResponseDTO(Room room, int capacity) {
    this.room = room;
    this.capacity = capacity;
  }

  public Room getRoom() {
    return this.room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }

  public int getCapacity() {
    return this.capacity;
  }

  public void setCapacity(int capacity) {
    this.capacity = capacity;
  }
}
