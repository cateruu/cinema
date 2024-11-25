package com.pawelkrml.movies.service;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.pawelkrml.movies.dto.UserResponseDTO;
import com.pawelkrml.movies.model.ERole;
import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
  @Autowired
  private UserRepository userRepository;

  public List<User> getAll() {
    return userRepository.findAll();
  }

  public User getById(UUID id) {
    return userRepository.findById(id)
        .orElseThrow(() -> new EntityNotFoundException("user with given id: " + id + " not found."));
  }

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

  public UserResponseDTO transformToResponse(User user) {
    UserResponseDTO responseDTO = new UserResponseDTO();
    responseDTO.setId(user.getId());
    responseDTO.setUsername(user.getUsername());
    responseDTO.setEmail(user.getEmail());
    responseDTO.setRoles(user.getRoles());

    return responseDTO;
  }

  public boolean isOnlyUserRole(UserDetails userDetails) {
    return userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority)
        .allMatch(role -> role.equals(ERole.ROLE_USER.toString()));
  }

  public void checkIfUserOwnsThatResource(UserDetails userDetails, UUID ownerdId) {
    UUID userId = this.getUserByUsername(userDetails.getUsername()).getId();

    if (this.isOnlyUserRole(userDetails) && !userId.equals(ownerdId)) {
      throw new AccessDeniedException("you do not have permission to access this resource.");
    }
  }

  public User update(User user) {
    return userRepository.save(user);
  }
}
