package com.pawelkrml.movies.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.pawelkrml.movies.model.ERole;
import com.pawelkrml.movies.model.Role;
import com.pawelkrml.movies.repository.RoleRepository;

@Component
public class DatabaseInit implements CommandLineRunner {
  @Autowired
  private RoleRepository roleRepository;

  @Override
  public void run(String... args) {
    if (roleRepository.count() == 0) {
      Role userRole = new Role(ERole.ROLE_USER);
      Role adminRole = new Role(ERole.ROLE_ADMIN);

      roleRepository.saveAll(Arrays.asList(userRole, adminRole));
    }
  }
}
