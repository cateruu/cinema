package com.pawelkrml.movies.dto;

import java.util.List;

import com.pawelkrml.movies.model.ERole;

public class TokenVerificationDTO {
  private boolean valid;
  private String username;
  private List<ERole> roles;

  public TokenVerificationDTO(boolean valid, String username, List<ERole> roles) {
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

  public List<ERole> getRoles() {
    return this.roles;
  }

  public void setRoles(List<ERole> roles) {
    this.roles = roles;
  }
}
