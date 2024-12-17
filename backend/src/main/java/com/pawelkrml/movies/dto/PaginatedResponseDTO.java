package com.pawelkrml.movies.dto;

import java.util.List;

import org.springframework.data.domain.Page;

public class PaginatedResponseDTO<T> {
  private List<T> content;
  private int currentPage;
  private int totalPages;
  private long totalItems;
  private boolean isFirst;
  private boolean isLast;
  private boolean isEmpty;
  private int size;

  private PaginatedResponseDTO() {
  }

  public static <T> PaginatedResponseDTO<T> from(Page<T> page) {
    PaginatedResponseDTO<T> response = new PaginatedResponseDTO<>();
    response.content = page.getContent();
    response.currentPage = page.getNumber();
    response.totalPages = page.getTotalPages();
    response.totalItems = page.getTotalElements();
    response.isFirst = page.isFirst();
    response.isLast = page.isLast();
    response.isEmpty = page.isEmpty();
    response.size = page.getSize();

    return response;
  }

  public List<T> getContent() {
    return this.content;
  }

  public int getCurrentPage() {
    return this.currentPage;
  }

  public int getTotalPages() {
    return this.totalPages;
  }

  public long getTotalItems() {
    return this.totalItems;
  }

  public boolean getIsFirst() {
    return this.isFirst;
  }

  public boolean getIsLast() {
    return this.isLast;
  }

  public boolean getIsEmpty() {
    return this.isEmpty;
  }

  public int getSize() {
    return this.size;
  }
}
