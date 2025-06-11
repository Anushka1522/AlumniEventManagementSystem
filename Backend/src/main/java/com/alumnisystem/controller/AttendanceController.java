package com.alumnisystem.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Attendance;
import com.alumnisystem.model.AttendanceResponse;
import com.alumnisystem.model.Event;
import com.alumnisystem.repository.AttendanceRepository;
import com.alumnisystem.services.AttendanceService;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;   

    // Get event title and registered alumni
    @GetMapping("/mark/{eventId}")
    public List<Alumni> getAlumniForMarking(@PathVariable int eventId) {
        return attendanceService.getRegisteredAlumni(eventId);
    }
    

    // Mark attendance
    @PostMapping("/mark")
    public String markAttendance(@RequestParam int eventId,
                                 @RequestParam int alumniId,
                                 @RequestParam String status) {
        attendanceService.markAttendance(eventId, alumniId, status);
        return "Attendance marked successfully";
    }

   
    
 
    @GetMapping("/attended/{alumniId}")
    public ResponseEntity<List<Map<String, Object>>> getAttendedEventsByAlumni(@PathVariable int alumniId)
    {
        List<Map<String, Object>> attendedEvents = attendanceService.getAttendedEventsByAlumni(alumniId);
        return new ResponseEntity<>(attendedEvents, HttpStatus.OK);
    }
    
}

