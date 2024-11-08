package com.pawelkrml.movies.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.RoomDTO;
import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.repository.MovieRepository;
import com.pawelkrml.movies.repository.RoomRepository;

@Service
public class RoomService {
  @Autowired
  private RoomRepository roomRepository;

  @Autowired
  private MovieService movieService;

  public Iterable<Room> getAllRooms() {
    return roomRepository.findAll();
  }

  public Optional<Room> getRoomById(UUID id) {
    return roomRepository.findById(id);
  }

  public Room createRoom(RoomDTO roomDto) {
    Movie movie = movieService.getMovieById(roomDto.getPlayingMovieId())
        .orElseThrow(() -> new RuntimeException("Movie not found"));

    Room room = new Room();
    room.setName(roomDto.getName());
    room.setPlayingTime(roomDto.getPlayingTime());
    room.setPlayingMovie(movie);
    return roomRepository.save(room);
  }

  public void deleteRoomById(UUID id) {
    roomRepository.deleteById(id);
  }
}
