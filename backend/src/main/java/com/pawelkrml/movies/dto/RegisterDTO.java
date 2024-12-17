package com.pawelkrml.movies.dto;

import java.util.Set;

import org.hibernate.validator.constraints.Length;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;

public class RegisterDTO {
  @NotBlank(message = "username cannot be empty")
  private String username;

  @NotBlank(message = "password cannot be empty")
  @Length(min = 3, max = 50, message = "password has to be min 3 and max 50 characters long")
  private String password;

  @NotBlank(message = "email cannot be empty")
  @Email(message = "provide valid email")
  private String email;

  private Set<String> roles;

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

  public Set<String> getRoles() {
    return this.roles;
  }

  public void setRoles(Set<String> roles) {
    this.roles = roles;
  }
}
