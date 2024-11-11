package com.pawelkrml.movies.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.User;

public interface UserRepository extends JpaRepository<User, UUID> {
  public Optional<User> findByUsername(String username);

  public boolean existsByUsername(String username);

  public boolean existsByEmail(String email);
}
