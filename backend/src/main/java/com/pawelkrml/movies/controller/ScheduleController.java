package com.pawelkrml.movies.controller;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.pawelkrml.movies.dto.MessageDTO;
import com.pawelkrml.movies.dto.ScheduleDTO;
import com.pawelkrml.movies.dto.ScheduleResponseDTO;
import com.pawelkrml.movies.model.Schedule;
import com.pawelkrml.movies.service.ScheduleService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/v1/schedule")
public class ScheduleController {
  @Autowired
  private ScheduleService scheduleService;

  @GetMapping
  public ResponseEntity<List<ScheduleResponseDTO>> getAllSchedule() {
    List<Schedule> schedule = scheduleService.getAllSchedule();

    return ResponseEntity
        .ok(schedule.stream().map(obj -> scheduleService.transformToDTO(obj)).collect(Collectors.toList()));
  }

  @PostMapping
  public ResponseEntity<ScheduleResponseDTO> createSchedule(@Valid @RequestBody ScheduleDTO scheduleDTO) {
    Schedule schedule = scheduleService.createSchedule(scheduleDTO);

    return ResponseEntity.ok(scheduleService.transformToDTO(schedule));
  }

  @GetMapping("/{id}")
  public ResponseEntity<ScheduleResponseDTO> getScheduleById(@PathVariable UUID id) {
    ScheduleResponseDTO responseDTO = scheduleService.transformToDTO(scheduleService.getById(id));

    return ResponseEntity.ok(responseDTO);
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<MessageDTO> removeSchedule(@PathVariable UUID id) {
    scheduleService.removeSchedule(id);

    return ResponseEntity.ok(new MessageDTO("success"));
  }

}
