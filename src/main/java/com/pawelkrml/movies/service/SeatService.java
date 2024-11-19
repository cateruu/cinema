package com.pawelkrml.movies.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.Room;
import com.pawelkrml.movies.model.Seat;
import com.pawelkrml.movies.repository.SeatRespository;

import jakarta.transaction.Transactional;

@Service
public class SeatService {
  @Autowired
  private SeatRespository seatRespository;

  @Transactional
  public void removeAllSeatsForRoom(UUID roomID) {
    seatRespository.deleteAllByRoomId(roomID);
  }

  @Transactional
  public void createSeatsForRoom(Room room, int rows, int seats) {
    int seatNumber = 0;
    for (int row = 1; row <= rows; row++) {
      for (char seat = 'A'; seat <= 'Z'; seat++) {
        if (seatNumber == seats) {
          seatNumber = 0;
          break;
        }

        seatRespository.save(new Seat(row, seat, room));
        seatNumber++;
      }
    }
  }

  public List<String> getAvailableSeatsForRoom(UUID roomId) {
    return seatRespository.getAvailableSeatsForRoom(roomId);
  }

  public int getRoomCapacity(UUID roomId) {
    return seatRespository.countByRoomId(roomId);
  }

  public boolean checkIfSeatsAvailable(List<String> tickets, UUID roomId) {
    List<String> availableSeats = this.getAvailableSeatsForRoom(roomId);

    return availableSeats.containsAll(tickets);
  }

  @Transactional
  public void reserveSeats(List<String> tickets, UUID roomId) {
    tickets.stream().forEach(ticket -> {
      String[] data = ticket.split("-");
      int row = Integer.valueOf(data[0]);
      char seatChar = data[1].charAt(0);

      Seat seat = seatRespository.getByRowBySeatByRoomId(row, seatChar, roomId);
      seat.setReserved(true);
      seatRespository.save(seat);
    });
  }

  @Transactional
  public void cancelSeatsReservation(List<String> tickets, UUID roomId) {
    tickets.stream().forEach(ticket -> {
      String[] data = ticket.split("-");
      int row = Integer.valueOf(data[0]);
      char seatChar = data[1].charAt(0);

      Seat seat = seatRespository.getByRowBySeatByRoomId(row, seatChar, roomId);
      seat.setReserved(false);
      seatRespository.save(seat);
    });
  }

}
