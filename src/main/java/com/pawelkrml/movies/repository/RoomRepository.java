package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.repository.CrudRepository;

import com.pawelkrml.movies.model.Room;

public interface RoomRepository extends CrudRepository<Room, UUID> {
}
