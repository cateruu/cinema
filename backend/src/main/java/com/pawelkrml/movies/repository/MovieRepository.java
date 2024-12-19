package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.pawelkrml.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
  @Query(value = "SELECT MAX(duration) FROM movies", nativeQuery = true)
  public int findMaxDuration();
}
