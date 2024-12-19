package com.pawelkrml.movies.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.dto.RoomResponseDTO;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.repository.RoomRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private SeatService seatService;

  public Page<Room> getAllRooms(int page, int size, String sortBy, String direction) {
    Direction sortDirection = direction.equalsIgnoreCase("desc") ? Direction.DESC : Direction.ASC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

    return roomRepository.findAll(pageable);
  }

  public Room getRoomById(UUID id) {
    return roomRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("room with given id: " + id + " not found."));
  }

  @Transactional
  public Room createRoom(RoomDTO roomDto) {
    if (roomRepository.findByName(roomDto.getName()) != null) {
      throw new DataIntegrityViolationException("room with name: " + roomDto.getName() + " already exists");
    }

    Room room = new Room();
    room.setName(roomDto.getName());

    Room createdRoom = roomRepository.save(room);

    seatService.createSeatsForRoom(createdRoom, roomDto.getRows(), roomDto.getSeats());

    return createdRoom;
  }

  public void deleteRoomById(UUID id) {
    roomRepository.deleteById(id);
  }

  public Room updateRoom(Room room) {
    return roomRepository.save(room);
  }

  public RoomResponseDTO transformToResponseDTO(Room room) {
    List<String> seats = seatService.getAvailableSeatsForRoom(room.getId());
    int capacity = seatService.getRoomCapacity(room.getId());
    int rows = seatService.getRoomRows(room.getId());

    return new RoomResponseDTO(room, seats, capacity, rows);
  }

  public Page<RoomResponseDTO> transformToPageResponseDTO(Page<Room> rooms) {
    return rooms.map(room -> {
      List<String> seats = seatService.getAvailableSeatsForRoom(room.getId());
      int capacity = seatService.getRoomCapacity(room.getId());
      int rows = seatService.getRoomRows(room.getId());

      return new RoomResponseDTO(room, seats, capacity, rows);
    });
  }
}
