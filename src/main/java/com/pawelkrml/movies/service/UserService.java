package com.pawelkrml.movies.service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public boolean isUsernameTaken(String username) {
    return userRepository.existsByUsername(username);
  }

  public boolean isEmailTaken(String email) {
    return userRepository.existsByEmail(email);
  }

  public void createUser(User user) {
    userRepository.save(user);
  }

  public User getUserById(UUID id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("user with given id: " + id + " not found."));
  }

  public User getUserByUsername(String username) {
    return userRepository.findByUsername(username).orElseThrow(() -> new EntityNotFoundException("user not found."));
  }
}
