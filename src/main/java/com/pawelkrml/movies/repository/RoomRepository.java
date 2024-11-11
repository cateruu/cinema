package com.pawelkrml.movies.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pawelkrml.movies.model.Room;

public interface RoomRepository extends JpaRepository<Room, UUID> {
}
