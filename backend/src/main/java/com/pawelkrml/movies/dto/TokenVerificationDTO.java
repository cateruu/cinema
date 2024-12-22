package com.pawelkrml.movies.dto;

import java.util.List;
import java.util.UUID;

import com.pawelkrml.movies.model.ERole;

public class TokenVerificationDTO {
  private UUID id;
  private boolean valid;
  private String username;
  private List<ERole> roles;

  public TokenVerificationDTO(UUID id, boolean valid, String username, List<ERole> roles) {
    this.id = id;
    this.valid = valid;
    this.username = username;
    this.roles = roles;
  }

  public UUID getId() {
    return this.id;
  }

  public void setId(UUID id) {
    this.id = id;
  }

  public boolean getValid() {
    return this.valid;
  }

  public void setValid(boolean valid) {
    this.valid = valid;
  }

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public List<ERole> getRoles() {
    return this.roles;
  }

  public void setRoles(List<ERole> roles) {
    this.roles = roles;
  }
}
