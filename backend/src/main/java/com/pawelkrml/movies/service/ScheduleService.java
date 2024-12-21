package com.pawelkrml.movies.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.ScheduleDTO;
import com.pawelkrml.movies.dto.ScheduleResponseDTO;
import com.pawelkrml.movies.error.BadRequestException;
import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.model.Schedule;
import com.pawelkrml.movies.repository.ScheduleRepository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ScheduleService {
  @Autowired
  private ScheduleRepository scheduleRepository;

  @Autowired
  private MovieService movieService;

  @Autowired
  private RoomService roomService;

  @Autowired
  private SeatService seatService;

  @Transactional
  public Schedule createSchedule(ScheduleDTO scheduleDTO) {
    Movie movie = movieService.getMovieById(UUID.fromString(scheduleDTO.getMovieId()));
    UUID roomId = UUID.fromString(scheduleDTO.getRoomId());

    boolean isRoomAvailable = this.isRoomAvailable(scheduleDTO.getPlayingTime(), movie, roomId);
    if (!isRoomAvailable) {
      throw new BadRequestException("Room is not available for the requested time slot");
    }

    Room room = roomService.getRoomById(roomId);

    Schedule schedule = new Schedule();
    schedule.setPlayingTime(scheduleDTO.getPlayingTime());
    schedule.setMovie(movie);
    schedule.setRoom(room);

    Schedule savedSchedule = scheduleRepository.save(schedule);
    seatService.createSeatsForSchedule(savedSchedule, room.getRows(), room.getSeats());

    return schedule;
  }

  public Schedule getById(UUID id) {
    return scheduleRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("schedule with given ID not found"));
  }

  public List<Schedule> getAllSchedule() {
    return scheduleRepository.findAll();
  }

  public List<Schedule> getScheduleForMovieId(UUID movieId) {
    return scheduleRepository.findAllByMovieId(movieId);
  }

  public List<Schedule> getScheduleForRoomId(UUID roomId) {
    return scheduleRepository.findAllByRoomId(roomId);
  }

  public void removeSchedule(UUID id) {
    scheduleRepository.deleteById(id);
  }

  private boolean isRoomAvailable(LocalDateTime playingTime, Movie movie, UUID roomId) {
    LocalDateTime movieStartTime = playingTime;
    LocalDateTime movieEndTime = movieStartTime.plusMinutes(movie.getDuration());

    List<Schedule> existingSchedulesBetween = scheduleRepository.findAllByRoomIdAndPlayingTimeBetween(
        roomId,
        movieStartTime.minusMinutes(movieService.getMaxMovieDuration()),
        movieEndTime);

    for (Schedule existingSchedule : existingSchedulesBetween) {
      LocalDateTime existingStartTime = existingSchedule.getPlayingTime();
      LocalDateTime existingEndTime = existingStartTime.plusMinutes(existingSchedule.getMovie().getDuration());

      if (isOverlapping(movieStartTime, movieEndTime, existingStartTime, existingEndTime)) {
        return false;
      }
    }

    return true;
  }

  public ScheduleResponseDTO transformToDTO(Schedule schedule) {
    ScheduleResponseDTO responseDTO = new ScheduleResponseDTO();
    responseDTO.setId(schedule.getId());
    responseDTO.setPlayingTime(schedule.getPlayingTime());
    responseDTO.setMovie(schedule.getMovie());
    responseDTO.setRoom(roomService.transformToResponseDTO(schedule.getRoom()));
    responseDTO.setAvailableSeats(seatService.getAvailableSeatsForSchedule(schedule.getId()));

    return responseDTO;
  }

  private boolean isOverlapping(
      LocalDateTime startReq,
      LocalDateTime endReq,
      LocalDateTime startExisting,
      LocalDateTime endExisting) {
    return startReq.isBefore(endExisting) && endReq.isAfter(startExisting);
  }
}
