package com.pawelkrml.movies.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.JwtResponseDTO;
import com.pawelkrml.movies.dto.LoginDTO;
import com.pawelkrml.movies.dto.MessageDTO;
import com.pawelkrml.movies.dto.RegisterDTO;
import com.pawelkrml.movies.dto.TokenVerificationDTO;
import com.pawelkrml.movies.error.ErrorResponse;
import com.pawelkrml.movies.jwt.JwtTokenProvider;
import com.pawelkrml.movies.model.ERole;
import com.pawelkrml.movies.model.Role;
import com.pawelkrml.movies.model.User;
import com.pawelkrml.movies.service.RoleService;
import com.pawelkrml.movies.service.UserService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/auth")
public class AuthController {
  @Autowired
  private AuthenticationManager authenticationManager;

  @Autowired
  private UserService userService;

  @Autowired
  private RoleService roleService;

  @Autowired
  private PasswordEncoder passwordEncoder;

  @Autowired
  private JwtTokenProvider tokenProvider;

  @PostMapping("/login")
  public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginDTO loginDTO) {
    Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getUsername(), loginDTO.getPassword()));

    SecurityContextHolder.getContext().setAuthentication(authentication);
    String jwt = tokenProvider.generateToken(authentication);

    UserDetails userDetails = (UserDetails) authentication.getPrincipal();
    List<String> roles = userDetails.getAuthorities().stream().map(role -> role.getAuthority())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new JwtResponseDTO(jwt, userDetails.getUsername(), roles));
  }

  @PostMapping("/register")
  public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterDTO registerDTO) {
    if (userService.isUsernameTaken(registerDTO.getUsername())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("CONFLICT", "username already taken"));
    }

    if (userService.isEmailTaken(registerDTO.getEmail())) {
      return ResponseEntity.status(HttpStatus.CONFLICT).body(new ErrorResponse("CONFLICT", "email already taken"));
    }

    User user = new User(registerDTO.getUsername(), passwordEncoder.encode(registerDTO.getPassword()),
        registerDTO.getEmail());
    Set<String> strRoles = registerDTO.getRoles();
    Set<Role> roles = new HashSet<>();

    if (strRoles == null) {
      Role userRole = roleService.getRole(ERole.ROLE_USER);
      roles.add(userRole);
    } else {
      strRoles.forEach(role -> {
        switch (role) {
          case "admin":
            Role adminRole = roleService.getRole(ERole.ROLE_ADMIN);
            roles.add(adminRole);
            break;
          default:
            Role userRole = roleService.getRole(ERole.ROLE_USER);
            roles.add(userRole);
            break;
        }
      });
    }

    user.setRoles(roles);
    userService.createUser(user);

    return ResponseEntity.ok(new MessageDTO("user created successfully."));
  }

  @GetMapping("/verify")
  public ResponseEntity<?> verifyToken(@RequestHeader("Authorization") String authorization) {
    String[] parts = authorization.split(" ");
    String type = parts[0];
    String jwt = parts[1];

    if (!type.equals("Bearer") || !tokenProvider.validateToken(jwt)) {
      return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
          .body(new ErrorResponse("INVALID_TOKEN", "provided JWT token is invalid"));
    }

    String username = tokenProvider.getUsernameForToken(jwt);
    List<ERole> roles = userService.getUserByUsername(username).getRoles().stream().map(role -> role.getName())
        .collect(Collectors.toList());

    return ResponseEntity.ok(new TokenVerificationDTO(true, username, roles));
  }
}
