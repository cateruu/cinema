package com.pawelkrml.movies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.ERole;
import com.pawelkrml.movies.model.Role;
import com.pawelkrml.movies.repository.RoleRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class RoleService {
  @Autowired
  private RoleRepository roleRepository;

  public Role getRole(ERole role) {
    return roleRepository.findByName(role)
        .orElseThrow(() -> new EntityNotFoundException("role with given name do not exist"));
  }
}
