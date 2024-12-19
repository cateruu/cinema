package com.pawelkrml.movies.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.repository.MovieRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MovieService {
  @Autowired
  private MovieRepository movieRepository;

  public Page<Movie> getAllMovies(int page, int size, String sortBy, String direction) {
    Direction sortDirection = direction.equalsIgnoreCase("desc") ? Direction.DESC : Direction.ASC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(sortDirection, sortBy));

    return movieRepository.findAll(pageable);
  }

  public Movie saveMovie(Movie movie) {
    return movieRepository.save(movie);
  }

  public Movie getMovieById(UUID id) {
    return movieRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("movie with given id: " + id + " not found."));
  }

  public void deleteMovieById(UUID id) {
    movieRepository.deleteById(id);
  }

  public Movie updateMovie(Movie movie) {
    return movieRepository.save(movie);
  }

  public int getMaxMovieDuration() {
    return movieRepository.findMaxDuration();
  }
}
