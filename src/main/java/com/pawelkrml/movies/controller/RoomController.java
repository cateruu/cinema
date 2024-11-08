package com.pawelkrml.movies.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.service.RoomService;

@RestController
@RequestMapping("/v1/rooms")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @GetMapping
  public Iterable<Room> getAllRooms() {
    return roomService.getAllRooms();
  }

  @PostMapping
  public Room createRoom(@RequestBody RoomDTO roomDto) {
    return roomService.createRoom(roomDto);
  }

  @GetMapping("/{id}")
  public Room getRoomById(@PathVariable UUID id) {
    Optional<Room> room = roomService.getRoomById(id);

    if (room.isPresent()) {
      return room.get();
    }

    return null;
  }

  @DeleteMapping("/{id}")
  public boolean deleteRoom(@PathVariable UUID id) {
    roomService.deleteRoomById(id);

    return true;
  }
}
