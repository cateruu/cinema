package com.pawelkrml.movies.service;

import java.io.IOException;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.pawelkrml.movies.error.FileUploadException;

import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
  @Autowired
  private S3Client s3Client;

  @Value("${aws.s3.bucket}")
  private String bucketName;

  @Value("${aws.s3.region}")
  private String region;

  @Autowired
  private FileValidatorService fileValidator;

  public String uploadFile(MultipartFile file) {
    fileValidator.validateFile(file);

    try {
      String fileName = this.generateFileName(file.getOriginalFilename());
      PutObjectRequest request = PutObjectRequest.builder()
          .bucket(bucketName)
          .key(fileName)
          .contentType(file.getContentType())
          .build();

      s3Client.putObject(request, RequestBody.fromInputStream(file.getInputStream(), file.getSize()));

      return String.format("https://%s.s3.%s.amazonaws.com/%s", bucketName, region, fileName);
    } catch (IOException e) {
      throw new FileUploadException("Failed to upload file: " + e.getMessage(), e);
    }
  }

  private String generateFileName(String originalFileName) {
    return UUID.randomUUID().toString() + "_" + originalFileName;
  }
}
