package com.pawelkrml.movies.dto;

public class UploadDTO {
  private String url;

  public UploadDTO(String url) {
    this.url = url;
  }

  public String getUrl() {
    return this.url;
  }

  public void setUrl(String url) {
    this.url = url;
  }
}
