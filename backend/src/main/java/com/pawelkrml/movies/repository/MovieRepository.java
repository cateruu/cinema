package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.pawelkrml.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
  @Query(value = "SELECT MAX(duration) FROM movies", nativeQuery = true)
  public int findMaxDuration();

  @Query("SELECT m FROM Movie m WHERE " +
      "LOWER(m.name) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
      "LOWER(m.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
  public Page<Movie> searchMovies(@Param("searchTerm") String searchTerm, Pageable pageable);
}
