package com.pawelkrml.movies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.service.MovieService;

@RestController
@RequestMapping("/v1/movies")
public class MovieController {

  @Autowired
  private MovieService movieService;

  @GetMapping
  public Iterable<Movie> getAllMovies() {
    return movieService.getAllMovies();
  }

  @PostMapping
  public Movie createMovie(@RequestBody Movie movie) {
    return movieService.saveMovie(movie);
  }
}
