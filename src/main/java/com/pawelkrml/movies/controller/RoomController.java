package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

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

import com.pawelkrml.movies.dto.ReservationResponseDTO;
import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.dto.RoomResponseDTO;
import com.pawelkrml.movies.model.Reservation;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.service.MovieService;
import com.pawelkrml.movies.service.ReservationService;
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

  @Autowired
  ReservationService reservationService;

  @GetMapping
  public ResponseEntity<Iterable<RoomResponseDTO>> getAllRooms() {
    Iterable<Room> rooms = roomService.getAllRooms();
    ArrayList<RoomResponseDTO> roomResponse = new ArrayList<>();

    rooms.forEach(room -> {
      List<String> seats = seatService.getAvailableSeatsForRoom(room.getId());
      int capacity = seatService.getRoomCapacity(room.getId());
      roomResponse.add(new RoomResponseDTO(room, seats, capacity));
    });

    return ResponseEntity.ok(roomResponse);
  }

  @PostMapping
  public ResponseEntity<RoomResponseDTO> createRoom(@Valid @RequestBody RoomDTO roomDto) {
    Room room = roomService.createRoom(roomDto);
    List<String> availableSeats = seatService.getAvailableSeatsForRoom(room.getId());
    int capacity = seatService.getRoomCapacity(room.getId());

    return ResponseEntity.ok(new RoomResponseDTO(room, availableSeats, capacity));
  }

  @GetMapping("/{id}")
  public ResponseEntity<RoomResponseDTO> getRoomById(@PathVariable UUID id) {
    Room room = roomService.getRoomById(id);
    List<String> availableSeats = seatService.getAvailableSeatsForRoom(room.getId());
    int capacity = seatService.getRoomCapacity(room.getId());

    return ResponseEntity.ok(new RoomResponseDTO(room, availableSeats, capacity));
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteRoom(@PathVariable UUID id) {
    roomService.deleteRoomById(id);

    return ResponseEntity.ok().build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<RoomResponseDTO> updateRoom(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
    Room room = roomService.getRoomById(id);

    if (updates.containsKey("rows") && updates.containsKey("seats")) {
      reservationService.deleteAllReservationsForRoom(id);
      seatService.removeAllSeatsForRoom(id);
      int rows = Integer.valueOf(String.valueOf(updates.get("rows")));
      int seats = Integer.valueOf(String.valueOf(updates.get("seats")));

      seatService.createSeatsForRoom(room, rows, seats);
    } else if (updates.containsKey("rows") || updates.containsKey("seats")) {
      throw new IllegalArgumentException(
          "if you want to update room layout both 'rows' and 'seats' values have to be present.");
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

    room.setUpdatedAt(LocalDateTime.now());

    roomService.updateRoom(room);
    List<String> availableSeats = seatService.getAvailableSeatsForRoom(room.getId());
    int capacity = seatService.getRoomCapacity(room.getId());

    return ResponseEntity.ok(new RoomResponseDTO(room, availableSeats, capacity));
  }

  @GetMapping("/{id}/reservations")
  public ResponseEntity<List<ReservationResponseDTO>> getAllReservationsForRoom(@PathVariable UUID id) {
    List<Reservation> reservations = reservationService.getAllForRoomId(id);

    return ResponseEntity.ok(reservations.stream()
        .map(reservation -> reservationService.tranformToResponseDto(reservation)).collect(Collectors.toList()));
  }
}
