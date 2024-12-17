package com.pawelkrml.movies.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pawelkrml.movies.error.InvalidFileException;

@Service
public class FileValidatorService {
  @Value("${app.file.max-size}")
  private long maxSize;

  @Value("#{'${app.file.allowed-types}'.split(',')}")
  private List<String> allowedTypes;

  public void validateFile(MultipartFile file) {
    if (file.isEmpty()) {
      throw new InvalidFileException("File is empty");
    }

    if (file.getSize() > maxSize) {
      throw new InvalidFileException("File size exceeds maximum limit of 5MB");
    }

    String contentType = file.getContentType();
    if (contentType == null || !allowedTypes.contains(contentType)) {
      throw new InvalidFileException("Invalid file type. JPEG, PNG and WebP are allowed.");
    }
  }
}
