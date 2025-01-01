package com.pawelkrml.movies.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/")
public class HomeController {

  @GetMapping
  public ResponseEntity<Map<String, String>> welcomeMessage() {
    Map<String, String> resp = new HashMap<>();
    resp.put("message", "welcome to cinema api.");

    return ResponseEntity.ok(resp);
  }
}
