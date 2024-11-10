package com.pawelkrml.movies.repository;

import org.springframework.data.repository.CrudRepository;

import com.pawelkrml.movies.model.Role;

public interface RoleRepository extends CrudRepository<Role, Long> {
}
