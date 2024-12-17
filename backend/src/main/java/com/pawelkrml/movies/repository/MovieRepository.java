package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, UUID> {
}
