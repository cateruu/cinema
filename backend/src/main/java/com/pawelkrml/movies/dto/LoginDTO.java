package com.pawelkrml.movies.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.NotBlank;

public class LoginDTO {
  @NotBlank(message = "username cannot be empty")
  private String username;

  @NotBlank(message = "password cannot be empty")
  @Length(min = 3, max = 50, message = "password has to be min 3 and max 50 characters long")
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
