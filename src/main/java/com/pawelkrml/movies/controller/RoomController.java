package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.service.MovieService;
import com.pawelkrml.movies.service.RoomService;
import com.pawelkrml.movies.service.SeatService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/rooms")
public class RoomController {
  @Autowired
  private RoomService roomService;

  @Autowired
  private MovieService movieService;

  @Autowired
  private SeatService seatService;

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

    if (updates.containsKey("rows") && updates.containsKey("seats")) {
      seatService.removeAllSeatsForRoom(id);
      int rows = Integer.valueOf(String.valueOf(updates.get("rows")));
      int seats = Integer.valueOf(String.valueOf(updates.get("seats")));

      seatService.createSeatsForRoom(room, rows, seats);
    } else if (updates.containsKey("rows") || updates.containsKey("seats")) {
      throw new IllegalArgumentException(
          "if you want to update room layout both 'rows' and 'seats' values has to be present.");
    }

    updates.remove("rows");
    updates.remove("seats");

    updates.forEach((key, value) -> {
      try {
        Field field = room.getClass().getDeclaredField(key);
        field.setAccessible(true);

        if (key.equals("playingMovie")) {
          value = movieService.getMovieById(UUID.fromString(String.valueOf(value)));
        }

        field.set(room, value);
      } catch (NoSuchFieldException | IllegalAccessException e) {
        throw new IllegalArgumentException("unknown key: " + key);
      }
    });

    roomService.updateRoom(room);

    return ResponseEntity.ok(room);
  }
}
