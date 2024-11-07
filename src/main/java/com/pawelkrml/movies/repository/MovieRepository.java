package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.pawelkrml.movies.model.Movie;

public interface MovieRepository extends CrudRepository<Movie, UUID> {
}
