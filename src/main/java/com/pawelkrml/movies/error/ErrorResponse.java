package com.pawelkrml.movies.error;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class ErrorResponse {
  private String status;
  private String message;
  private List<String> errors;
  private LocalDateTime timestamp;

  public ErrorResponse() {
    this.timestamp = LocalDateTime.now();
    this.errors = new ArrayList<>();
  }

  public ErrorResponse(String status, String message) {
    this();
    this.status = status;
    this.message = message;
  }

  public ErrorResponse(String status, String message, List<String> errors) {
    this();
    this.status = status;
    this.message = message;
    this.errors = errors;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getMessage() {
    return message;
  }

  public void setMessage(String message) {
    this.message = message;
  }

  public List<String> getErrors() {
    return errors;
  }

  public void setErrors(List<String> errors) {
    this.errors = errors;
  }

  public LocalDateTime getTimestamp() {
    return timestamp;
  }

  public void setTimestamp(LocalDateTime timestamp) {
    this.timestamp = timestamp;
  }

  @Override
  public String toString() {
    StringBuilder json = new StringBuilder();
    json.append("{");
    json.append("\"status:\":\"").append(this.status).append("\",");
    json.append("\"message\":\"").append(this.message).append("\",");
    if (!this.errors.isEmpty()) {
      json.append("\"errors\":").append(this.errors).append(",");
    }
    json.append("\"timestamp\":\"").append(this.timestamp).append("\"");
    json.append("}");

    return json.toString();
  }
}
