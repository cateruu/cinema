package com.pawelkrml.movies.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.pawelkrml.movies.error.CustomAccessDeniedHandler;
import com.pawelkrml.movies.jwt.JwtAuthenticationFilter;
import com.pawelkrml.movies.service.CustomUserDetailsService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {
  @Autowired
  private CustomAccessDeniedHandler customAccessDeniedHandler;

  @Autowired
  private CustomUserDetailsService userDetailsService;

  @Autowired
  private JwtAuthenticationFilter jwtAuthenticationFilter;

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
    http.csrf(csrf -> csrf.disable())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .authorizeHttpRequests(requests -> requests
            .requestMatchers("/v1/auth/**").permitAll()
            .requestMatchers(HttpMethod.GET, "/v1/movies/**", "/v1/rooms/{id}", "/v1/schedule/{id}").permitAll()
            .requestMatchers(HttpMethod.POST, "/v1/reservations").hasAnyRole("ADMIN", "USER")
            .requestMatchers("/v1/reservations/{id}", "/v1/users/{id}", "/v1/rooms", "v1/rooms/{id}")
            .hasAnyRole("ADMIN", "USER")
            .requestMatchers("/v1/movies/**", "/v1/rooms/**", "/v1/reservations/**", "/v1/users/**", "/v1/upload/**",
                "/v1/schedule/**")
            .hasRole("ADMIN")
            .anyRequest().authenticated())
        .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
        .exceptionHandling(handler -> handler.accessDeniedHandler(customAccessDeniedHandler));

    return http.build();
  }

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Bean
  public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  public DaoAuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
    authProvider.setUserDetailsService(userDetailsService);
    authProvider.setPasswordEncoder(passwordEncoder());

    return authProvider;
  }
}
