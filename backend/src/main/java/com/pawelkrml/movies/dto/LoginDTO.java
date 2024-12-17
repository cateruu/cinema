package com.pawelkrml.movies.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
  @NotBlank(message = "cannot be empty")
  private String username;

  @NotBlank(message = "cannot be empty")
  @Length(min = 3, max = 50, message = "has to be min 3 and max 50 characters long")
  private String password;

  public String getUsername() {
    return this.username;
  }

  public void setUsername(String name) {
    this.username = name;
  }

  public String getPassword() {
    return this.password;
  }

  public void setPassword(String hash) {
    this.password = hash;
  }
}
