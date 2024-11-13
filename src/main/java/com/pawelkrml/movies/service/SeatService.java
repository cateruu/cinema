package com.pawelkrml.movies.service;

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

}
