package com.pawelkrml.movies.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.ReservationDTO;
import com.pawelkrml.movies.dto.ReservationResponseDTO;
import com.pawelkrml.movies.model.Reservation;
import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.repository.ReservationRespository;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;

@Service
public class ReservationService {
  @Autowired
  private ReservationRespository reservationRespository;

  @Autowired
  private RoomService roomService;

  @Autowired
  private SeatService seatService;

  @Autowired
  private UserService userService;

  @Transactional
  public Reservation createReservation(ReservationDTO reservationDTO) {
    Room room = roomService.getRoomById(UUID.fromString(reservationDTO.getRoomId()));
    User user = userService.getUserById(UUID.fromString(reservationDTO.getUserId()));
    Reservation reservation = new Reservation(reservationDTO.getTickets(), user, room);

    boolean seatsAvailable = seatService.checkIfSeatsAvailable(reservation.getTickets(), reservation.getRoom().getId());

    if (!seatsAvailable) {
      throw new DataIntegrityViolationException("tickets you are trying to buy are already reserved.");
    }

    seatService.reserveSeats(reservation.getTickets(), reservation.getRoom().getId());

    return reservationRespository.save(reservation);
  }

  public Reservation getReservationById(UUID id) {
    return reservationRespository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("reservation with given id: " + id + " do not exist."));
  }

  public List<Reservation> getAllReservations() {
    return reservationRespository.findAll();
  }

  public ReservationResponseDTO tranformToResponseDto(Reservation reservation) {
    ReservationResponseDTO responseDTO = new ReservationResponseDTO();
    responseDTO.setId(reservation.getId());
    responseDTO.setTickets(reservation.getTickets());
    responseDTO.setMovieName(reservation.getRoom().getPlayingMovie().getName());
    responseDTO.setPrice(reservation.getRoom().getPlayingMovie().getTicketPrice()
        .multiply(BigDecimal.valueOf(reservation.getTickets().size())));
    responseDTO.setRomoName(reservation.getRoom().getName());
    responseDTO.setPlayingTime(reservation.getRoom().getPlayingTime());
    responseDTO.setUserId(reservation.getUser().getId());
    responseDTO.setCreatedAt(reservation.getCreatedAt());
    responseDTO.setUpdatedAt(reservation.getUpdatedAt());

    return responseDTO;
  }

  public List<Reservation> getAllForRoomId(UUID roomId) {
    return reservationRespository.getAllForRoomId(roomId);
  }

  public void deleteAllReservationsForRoom(UUID roomId) {
    reservationRespository.deleteAllByRoomId(roomId);
  }

  public Reservation update(Reservation reservation) {
    return reservationRespository.save(reservation);
  }
}
