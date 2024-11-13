package com.pawelkrml.movies.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.repository.MovieRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class MovieService {
  @Autowired
  private MovieRepository movieRepository;

  public Iterable<Movie> getAllMovies() {
    return movieRepository.findAll();
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
}
