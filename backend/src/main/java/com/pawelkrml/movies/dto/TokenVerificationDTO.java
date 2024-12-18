package com.pawelkrml.movies.dto;

import java.util.Set;

import com.pawelkrml.movies.model.Role;

public class TokenVerificationDTO {
  private boolean valid;
  private String username;
  private Set<Role> roles;

  public TokenVerificationDTO(boolean valid, String username, Set<Role> roles) {
    this.valid = valid;
    this.username = username;
    this.roles = roles;
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

  public Set<Role> getRoles() {
    return this.roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }
}
