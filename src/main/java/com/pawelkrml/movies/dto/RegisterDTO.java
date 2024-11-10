package com.pawelkrml.movies.dto;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;

public class RegisterDTO {
  @NotEmpty(message = "username cannot be empty")
  private String username;

  @NotEmpty(message = "password cannot be empty")
  @Length(min = 3, max = 50, message = "password has to be min 3 and max 50 characters long")
  private String password;

  @NotEmpty(message = "email cannot be empty")
  @Email
  private String email;

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

  public String getEmail() {
    return this.email;
  }

  public void setEmail(String email) {
    this.email = email;
  }
}
