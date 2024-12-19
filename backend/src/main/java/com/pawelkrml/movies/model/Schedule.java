package com.pawelkrml.movies.model;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "schedule")
public class Schedule {
  @Id
  @GeneratedValue(strategy = GenerationType.UUID)
  private UUID id;

  @Column(name = "playing_time", nullable = false)
  private LocalDateTime playingTime;

  @ManyToOne
  @JoinColumn(name = "movie_id", nullable = false)
  private Movie movie;

  @ManyToOne
  @JoinColumn(name = "room_id", nullable = false)
  private Room room;

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public LocalDateTime getPlayingTime() {
    return this.playingTime;
  }

  public void setPlayingTime(LocalDateTime time) {
    this.playingTime = time;
  }

  public Movie getMovie() {
    return this.movie;
  }

  public void setMovie(Movie movie) {
    this.movie = movie;
  }

  public Room getRoom() {
    return this.room;
  }

  public void setRoom(Room room) {
    this.room = room;
  }
}
