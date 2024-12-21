package com.pawelkrml.movies.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.Schedule;
import com.pawelkrml.movies.model.Seat;
import com.pawelkrml.movies.repository.SeatRespository;

import jakarta.transaction.Transactional;

@Service
public class SeatService {
  @Autowired
  private SeatRespository seatRespository;

  @Transactional
  public void removeAllSeatsForSchedule(UUID roomID) {
    seatRespository.deleteAllByScheduleId(roomID);
  }

  @Transactional
  public void createSeatsForSchedule(Schedule schedule, int rows, int seats) {
    int seatNumber = 0;
    for (int row = 1; row <= rows; row++) {
      for (char seat = 'A'; seat <= 'Z'; seat++) {
        if (seatNumber == seats) {
          seatNumber = 0;
          break;
        }

        seatRespository.save(new Seat(row, seat, schedule));
        seatNumber++;
      }
    }
  }

  public List<String> getAvailableSeatsForSchedule(UUID scheduleId) {
    return seatRespository.getAvailableSeatsForSchedule(scheduleId);
  }

  public int getRoomCapacity(UUID scheduleId) {
    return seatRespository.countByScheduleId(scheduleId);
  }

  public int getRoomRows(UUID scheduleId) {
    return seatRespository.getRowsNumberForScheduleId(scheduleId);
  }

  public boolean checkIfSeatsAvailable(List<String> tickets, UUID scheduleId) {
    List<String> availableSeats = this.getAvailableSeatsForSchedule(scheduleId);

    return availableSeats.containsAll(tickets);
  }

  @Transactional
  public void reserveSeats(List<String> tickets, UUID scheduleId) {
    tickets.stream().forEach(ticket -> {
      String[] data = ticket.split("-");
      int row = Integer.valueOf(data[0]);
      char seatChar = data[1].charAt(0);

      Seat seat = seatRespository.getByRowBySeatByScheduleId(row, seatChar, scheduleId);
      seat.setReserved(true);
      seatRespository.save(seat);
    });
  }

  @Transactional
  public void cancelSeatsReservation(List<String> tickets, UUID scheduleId) {
    tickets.stream().forEach(ticket -> {
      String[] data = ticket.split("-");
      int row = Integer.valueOf(data[0]);
      char seatChar = data[1].charAt(0);

      Seat seat = seatRespository.getByRowBySeatByScheduleId(row, seatChar, scheduleId);
      seat.setReserved(false);
      seatRespository.save(seat);
    });
  }

}
