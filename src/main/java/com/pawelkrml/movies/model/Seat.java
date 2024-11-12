package com.pawelkrml.movies.model;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "seats")
public class Seat {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(nullable = false)
  private int row;

  @Column(nullable = false)
  private char seat;

  @Column(nullable = false)
  private boolean reserved;

  @ManyToOne
  @JoinColumn(name = "room_id", unique = false)
  @OnDelete(action = OnDeleteAction.CASCADE)
  private Room room;

  public Seat(int row, char seat, Room room) {
    this.row = row;
    this.seat = seat;
    this.reserved = false;
    this.room = room;
  }

  public Long getId() {
    return this.id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public int getRow() {
    return this.row;
  }

  public void setRow(int row) {
    this.row = row;
  }

  public char getSeat() {
    return this.seat;
  }

  public void setSeat(char seat) {
    this.seat = seat;
  }

  public boolean getReserved() {
    return this.reserved;
  }

  public void setReserved(boolean reserved) {
    this.reserved = reserved;
  }

  public Room getRoom() {
    return this.room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }
}
