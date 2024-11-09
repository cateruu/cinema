package com.pawelkrml.movies.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.repository.RoomRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private MovieService movieService;

  public Iterable<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Room getRoomById(UUID id) {
    return roomRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("room with given id: " + id + " not found."));
  }

  public Room createRoom(RoomDTO roomDto) {
    Movie movie = movieService.getMovieById(roomDto.getPlayingMovieId());

    Room room = new Room();
    room.setName(roomDto.getName());
    room.setPlayingTime(roomDto.getPlayingTime());
    if (movie != null) {
      room.setPlayingMovie(movie);
    }

    return roomRepository.save(room);
  }

  public void deleteRoomById(UUID id) {
    roomRepository.deleteById(id);
  }
}
