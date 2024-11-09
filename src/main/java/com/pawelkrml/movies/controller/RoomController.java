package com.pawelkrml.movies.controller;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
  public ResponseEntity<Iterable<Room>> getAllRooms() {
    return ResponseEntity.ok(roomService.getAllRooms());
  }

  @PostMapping
  public ResponseEntity<Room> createRoom(@RequestBody RoomDTO roomDto) {
    return ResponseEntity.ok(roomService.createRoom(roomDto));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Room> getRoomById(@PathVariable UUID id) {
    Optional<Room> room = roomService.getRoomById(id);

    if (room.isPresent()) {
      return ResponseEntity.ok(room.get());
    }

    return ResponseEntity.notFound().build();
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Boolean> deleteRoom(@PathVariable UUID id) {
    roomService.deleteRoomById(id);

    return ResponseEntity.ok(true);
  }
}
