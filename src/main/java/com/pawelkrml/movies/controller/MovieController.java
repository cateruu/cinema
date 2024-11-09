package com.pawelkrml.movies.controller;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.service.MovieService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/movies")
public class MovieController {

  @Autowired
  private MovieService movieService;

  @GetMapping
  public ResponseEntity<Iterable<Movie>> getAllMovies() {
    return ResponseEntity.ok(movieService.getAllMovies());
  }

  @PostMapping
  public ResponseEntity<Movie> createMovie(@Valid @RequestBody Movie movie) {
    return ResponseEntity.ok(movieService.saveMovie(movie));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Movie> getMovieById(@PathVariable String id) {
    Movie movie = movieService.getMovieById(UUID.fromString(id));

    return ResponseEntity.ok(movie);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteMovie(@PathVariable UUID id) {
    movieService.deleteMovieById(id);

    return ResponseEntity.ok().build();
  }
}
