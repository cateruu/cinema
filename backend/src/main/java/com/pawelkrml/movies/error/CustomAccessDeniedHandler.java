package com.pawelkrml.movies.error;

import java.io.IOException;
import java.io.PrintWriter;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.stereotype.Component;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomAccessDeniedHandler implements AccessDeniedHandler {

  @Override
  public void handle(HttpServletRequest request, HttpServletResponse response,
      AccessDeniedException accessDeniedException) throws IOException, ServletException {
    response.setStatus(HttpStatus.FORBIDDEN.value());
    response.setContentType(MediaType.APPLICATION_JSON_VALUE);

    ErrorResponse errorResponse = new ErrorResponse("FORBIDDEN", "you do not have permission to access this resource.");

    try (PrintWriter writer = response.getWriter()) {
      writer.write(errorResponse.toString());
      writer.flush();
    }
  }
}
