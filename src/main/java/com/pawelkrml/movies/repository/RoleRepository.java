package com.pawelkrml.movies.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.ERole;
import com.pawelkrml.movies.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
  public Optional<Role> findByName(ERole name);
}
