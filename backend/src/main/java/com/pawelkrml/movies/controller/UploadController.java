package com.pawelkrml.movies.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.pawelkrml.movies.dto.UploadDTO;
import com.pawelkrml.movies.service.S3Service;

@RestController
@RequestMapping("/v1/upload")
public class UploadController {
  @Autowired
  private S3Service s3Service;

  @PostMapping
  public ResponseEntity<UploadDTO> uploadFile(@RequestParam("file") MultipartFile file) {
    String fileUrl = s3Service.uploadFile(file);
    return ResponseEntity.ok(new UploadDTO(fileUrl));
  }
}
