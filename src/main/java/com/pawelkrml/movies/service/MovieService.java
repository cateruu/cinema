package com.pawelkrml.movies.service;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.repository.MovieRepository;

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

  public Optional<Movie> getMovieById(UUID id) {
    return movieRepository.findById(id);
  }

  public void deleteMovieById(UUID id) {
    movieRepository.deleteById(id);
  }
}
