package com.pawelkrml.movies.service;

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
    room.setRows(roomDto.getRows());
    room.setSeats(roomDto.getSeats());

    return roomRepository.save(room);
  }

  public void deleteRoomById(UUID id) {
    roomRepository.deleteById(id);
  }

  public Room updateRoom(Room room) {
    return roomRepository.save(room);
  }

  public RoomResponseDTO transformToResponseDTO(Room room) {
    int capacity = room.getRows() * room.getSeats();

    return new RoomResponseDTO(room, capacity);
  }

  public Page<RoomResponseDTO> transformToPageResponseDTO(Page<Room> rooms) {
    return rooms.map(room -> {
      int capacity = room.getRows() * room.getSeats();

      return new RoomResponseDTO(room, capacity);
    });
  }
}
