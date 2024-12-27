package com.pawelkrml.movies.dto;

import java.math.BigDecimal;
import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Positive;

public class MovieDTO {
  @NotBlank(message = "cannot be empty")
  private String name;

  @NotBlank(message = "cannot be empty")
  private String description;

  @Positive(message = "must be greater than 0")
  private int duration;

  @Positive(message = "must be greater than 0")
  private BigDecimal price;

  @NotEmpty(message = "must have at least one element")
  private List<String> genres;

  @NotBlank(message = "cannot be empty")
  private String thumbnailUrl;

  public String getName() {
    return this.name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getDescription() {
    return this.description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public int getDuration() {
    return this.duration;
  }

  public void setDuration(int duration) {
    this.duration = duration;
  }

  public List<String> getGenres() {
    return this.genres;
  }

  public void setGenres(List<String> genres) {
    this.genres = genres;
  }

  public BigDecimal getTicketPrice() {
    return this.price;
  }

  public void setTicketPrice(BigDecimal price) {
    this.price = price;
  }

  public String getThumbnailUrl() {
    return this.thumbnailUrl;
  }

  public void setThumbnailUrl(String url) {
    this.thumbnailUrl = url;
  }
}
