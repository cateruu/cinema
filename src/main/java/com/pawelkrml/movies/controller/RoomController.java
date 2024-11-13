package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.service.MovieService;
import com.pawelkrml.movies.service.RoomService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/rooms")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @Autowired
  private MovieService movieService;

  @GetMapping
  public ResponseEntity<Iterable<Room>> getAllRooms() {
    return ResponseEntity.ok(roomService.getAllRooms());
  }

  @PostMapping
  public ResponseEntity<Room> createRoom(@Valid @RequestBody RoomDTO roomDto) {
    return ResponseEntity.ok(roomService.createRoom(roomDto));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Room> getRoomById(@PathVariable UUID id) {
    Room room = roomService.getRoomById(id);

    return ResponseEntity.ok(room);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteRoom(@PathVariable UUID id) {
    roomService.deleteRoomById(id);

    return ResponseEntity.ok().build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Room> updateRoom(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
    Room room = roomService.getRoomById(id);

    updates.forEach((key, value) -> {
      try {
        Field field = room.getClass().getDeclaredField(key);
        field.setAccessible(true);

        if (key == "playingMovie") {
          value = movieService.getMovieById(UUID.fromString(String.valueOf(value)));
        }

        field.set(room, value);
      } catch (NoSuchFieldException | IllegalAccessException e) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid field: " + key);
      }
    });

    roomService.updateRoom(room);

    return ResponseEntity.ok(room);
  }
}
