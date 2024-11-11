package com.pawelkrml.movies.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.repository.UserRepository;

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
}
