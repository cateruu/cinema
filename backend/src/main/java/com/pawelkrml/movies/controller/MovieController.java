package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.MovieDTO;
import com.pawelkrml.movies.dto.PaginatedResponseDTO;
import com.pawelkrml.movies.dto.ScheduleResponseDTO;
import com.pawelkrml.movies.model.Movie;
import com.pawelkrml.movies.service.MovieService;
import com.pawelkrml.movies.service.ScheduleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/movies")
public class MovieController {

  @Autowired
  private MovieService movieService;

  @Autowired
  ScheduleService scheduleService;

  @GetMapping
  public ResponseEntity<PaginatedResponseDTO<Movie>> getAllMovies(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sortBy,
      @RequestParam(defaultValue = "desc") String direction) {
    Page<Movie> moviePage = movieService.getAllMovies(page, size, sortBy, direction);

    return ResponseEntity.ok(PaginatedResponseDTO.from(moviePage));
  }

  @PostMapping
  public ResponseEntity<Movie> createMovie(@Valid @RequestBody MovieDTO movie) {
    return ResponseEntity.ok(movieService.saveMovie(movie));
  }

  @GetMapping("/{id}")
  public ResponseEntity<Movie> getMovieById(@PathVariable UUID id) {
    Movie movie = movieService.getMovieById(id);

    return ResponseEntity.ok(movie);
  }

  @GetMapping("/{id}/schedule")
  public ResponseEntity<List<ScheduleResponseDTO>> getScheduleForMovie(@PathVariable UUID id) {
    List<ScheduleResponseDTO> responseDTO = scheduleService.getScheduleForMovieId(id).stream()
        .map(schedule -> scheduleService.transformToDTO(schedule)).collect(Collectors.toList());

    return ResponseEntity.ok(responseDTO);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<?> deleteMovie(@PathVariable UUID id) {
    movieService.deleteMovieById(id);

    return ResponseEntity.ok().build();
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Movie> updateMovie(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
    Movie movie = movieService.getMovieById(id);

    updates.forEach((key, value) -> {
      try {
        Field field = movie.getClass().getDeclaredField(key);
        field.setAccessible(true);

        if (key.equals("ticketPrice")) {
          value = BigDecimal.valueOf(Double.valueOf(value.toString()));
        }

        field.set(movie, value);
      } catch (NoSuchFieldException | IllegalAccessException e) {
        throw new IllegalArgumentException("unknown key: " + key);
      }
    });

    movie.setUpdatedAt(LocalDateTime.now());

    movieService.updateMovie(movie);

    return ResponseEntity.ok(movie);
  }
}
