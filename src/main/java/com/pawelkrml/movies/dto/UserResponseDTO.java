package com.pawelkrml.movies.dto;

import java.util.Set;
import java.util.UUID;

import com.pawelkrml.movies.model.Role;

public class UserResponseDTO {
  private UUID id;
  private String username;
  private String email;
  private Set<Role> roles;

  public UserResponseDTO() {
  }

  public UserResponseDTO(UUID id, String username, String email, Set<Role> roles) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.roles = roles;
  }

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String name) {
    this.username = name;
  }

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public Set<Role> getRoles() {
    return this.roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}
