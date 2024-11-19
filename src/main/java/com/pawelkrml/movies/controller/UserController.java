package com.pawelkrml.movies.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.UserResponseDTO;
import com.pawelkrml.movies.service.UserService;

@RestController
@RequestMapping("v1/users")
public class UserController {
  @Autowired
  private UserService userService;

  @GetMapping
  public ResponseEntity<List<UserResponseDTO>> getAllUsers() {
    return ResponseEntity.ok(
        userService.getAll().stream().map(user -> userService.transformToResponse(user)).collect(Collectors.toList()));
  }

  @GetMapping("/{id}")
  public ResponseEntity<UserResponseDTO> getUserById(@PathVariable UUID id) {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    UUID userId = userService.getUserByUsername(userDetails.getUsername()).getId();

    if (userService.isOnlyUserRole(userDetails) && !id.equals(userId)) {
      throw new AccessDeniedException("you do not have permission to access this resource.");
    }

    return ResponseEntity.ok(userService.transformToResponse(userService.getById(id)));
  }
}
