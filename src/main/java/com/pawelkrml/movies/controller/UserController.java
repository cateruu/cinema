package com.pawelkrml.movies.controller;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.UserResponseDTO;
import com.pawelkrml.movies.model.User;
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

  @PatchMapping("/{id}")
  public ResponseEntity<UserResponseDTO> updateUser(@PathVariable UUID id, @RequestBody Map<String, Object> updates) {
    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    User user = userService.getById(id);

    userService.checkIfUserOwnsThatResource(userDetails, user.getId());

    updates.forEach((key, value) -> {
      try {
        Field field = user.getClass().getDeclaredField(key);
        field.setAccessible(true);

        if (key.equals("email")) {
          if (!Pattern.compile("^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$").matcher(value.toString())
              .matches()) {
            throw new IllegalArgumentException("invalid email.");
          }
        }

        field.set(user, value);
      } catch (IllegalArgumentException e) {
        throw new IllegalArgumentException(e.getMessage());
      } catch (Exception e) {
        throw new IllegalArgumentException("unknown key: " + key);
      }
    });

    userService.update(user);

    return ResponseEntity.ok(userService.transformToResponse(user));
  }
}
