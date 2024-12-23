package com.pawelkrml.movies.service;

import java.math.BigDecimal;
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

import com.pawelkrml.movies.dto.ReservationDTO;
import com.pawelkrml.movies.dto.ReservationResponseDTO;
import com.pawelkrml.movies.model.Reservation;
import com.pawelkrml.movies.model.Schedule;
import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.repository.ReservationRespository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ReservationService {
  @Autowired
  private ReservationRespository reservationRespository;

  @Autowired
  private ScheduleService scheduleService;
  @Autowired
  private SeatService seatService;

  @Autowired
  private UserService userService;

  @Transactional
  public Reservation createReservation(ReservationDTO reservationDTO) {
    Schedule schedule = scheduleService.getById(UUID.fromString(reservationDTO.getScheduleId()));
    User user = userService.getUserById(UUID.fromString(reservationDTO.getUserId()));
    Reservation reservation = new Reservation(reservationDTO.getTickets(), user, schedule);

    boolean seatsAvailable = seatService.checkIfSeatsAvailable(reservation.getTickets(),
        reservation.getSchedule().getId());

    if (!seatsAvailable) {
      throw new DataIntegrityViolationException("tickets you are trying to buy are already reserved.");
    }

    seatService.reserveSeats(reservation.getTickets(), reservation.getSchedule().getId());

    return reservationRespository.save(reservation);
  }

  public Reservation getReservationById(UUID id) {
    return reservationRespository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("reservation with given id: " + id + " do not exist."));
  }

  public Page<Reservation> getAllReservations(int page, int size, String sortBy, String direction) {
    Direction sortDirection = direction.equalsIgnoreCase("desc") ? Direction.DESC : Direction.ASC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

    return reservationRespository.findAll(pageable);
  }

  public ReservationResponseDTO tranformToResponseDto(Reservation reservation) {
    ReservationResponseDTO responseDTO = new ReservationResponseDTO();
    responseDTO.setId(reservation.getId());
    responseDTO.setTickets(reservation.getTickets());
    responseDTO.setRoomName(reservation.getSchedule().getRoom().getName());
    responseDTO.setPlayingTime(reservation.getSchedule().getPlayingTime());
    responseDTO.setMovieName(reservation.getSchedule().getMovie().getName());
    responseDTO.setPrice(reservation.getSchedule().getMovie().getTicketPrice()
        .multiply(BigDecimal.valueOf(reservation.getTickets().size())));
    responseDTO.setThumbnailUrl(reservation.getSchedule().getMovie().getThumbnailUrl());
    responseDTO.setUserId(reservation.getUser().getId());
    responseDTO.setCreatedAt(reservation.getCreatedAt());
    responseDTO.setUpdatedAt(reservation.getUpdatedAt());

    return responseDTO;
  }

  public Page<ReservationResponseDTO> tranformToPageResponseDto(Page<Reservation> reservations) {
    return reservations.map(this::tranformToResponseDto);
  }

  public List<Reservation> getAllForRoomId(UUID roomId) {
    return reservationRespository.getAllForScheduleId(roomId);
  }

  public void deleteAllReservationsForRoom(UUID roomId) {
    reservationRespository.deleteAllByScheduleId(roomId);
  }

  public List<Reservation> getAllForUser(UUID userID) {
    return reservationRespository.findAllByUserId(userID);
  }

  public Reservation update(Reservation reservation) {
    return reservationRespository.save(reservation);
  }
}
