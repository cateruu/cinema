package com.pawelkrml.movies.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.pawelkrml.movies.model.User;

public interface UserRepository extends CrudRepository<User, UUID> {
  public Optional<User> findByUsername(String username);
}
