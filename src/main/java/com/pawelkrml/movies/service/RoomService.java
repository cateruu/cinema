package com.pawelkrml.movies.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Movie;
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

  @Autowired
  private MovieService movieService;

  public Iterable<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Room getRoomById(UUID id) {
    return roomRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("room with given id: " + id + " not found."));
  }

  @Transactional
  public Room createRoom(RoomDTO roomDto) {
    Movie movie = null;
    if (roomDto.getPlayingMovieId() != null) {
      movie = movieService.getMovieById(roomDto.getPlayingMovieId());
    }

    if (roomRepository.findByName(roomDto.getName()) != null) {
      throw new DataIntegrityViolationException("room with name: " + roomDto.getName() + " already exists");
    }

    Room room = new Room();
    room.setName(roomDto.getName());
    room.setPlayingTime(roomDto.getPlayingTime());

    if (movie != null) {
      room.setPlayingMovie(movie);
    }

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
}
