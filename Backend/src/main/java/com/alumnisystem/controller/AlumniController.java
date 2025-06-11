package com.alumnisystem.controller;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Attendance;
import com.alumnisystem.model.Branch;
import com.alumnisystem.model.Event;
import com.alumnisystem.services.AlumniService;
import com.alumnisystem.services.AttendanceService;
import com.alumnisystem.services.BranchService;
import com.alumnisystem.services.EventService;

@RestController
@RequestMapping("/api/alumni")
@CrossOrigin(origins = "http://localhost:5173") 
//@CrossOrigin("http://localhost:5173")
public class AlumniController {

    @Autowired
    private AlumniService alumniService;

    @Autowired
    private AttendanceService attendanceService;

    @Autowired
    private BranchService branchService;

    @Autowired
    private EventService eventService;

 
    
    @PostMapping("/alumni-login")
    public ResponseEntity<?> loginAlumni(@RequestBody Map<String, String> loginData)
    {
        String email = loginData.get("alumni_email");
        String password = loginData.get("password");

        try {
            Alumni alumni = alumniService.loginAlumni(email, password);
            return ResponseEntity.ok(alumni);
        } 
        catch (NoSuchElementException e)
        {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials.");
        }
    }
    
//=========================================================================================================


    @GetMapping("/profile/{alumniId}")
    public ResponseEntity<?> getAlumniProfile(@PathVariable int alumniId) {
        try {
            Alumni alumni = alumniService.getAlumniProfile(alumniId);
            return ResponseEntity.ok(alumni); 
        } catch (NoSuchElementException e) 
        {
            return ResponseEntity.status(404).body("Alumni profile not found.");
        }
    }
    
    // Endpoint to update the alumni profile.
    @PutMapping("/profile/update")  
    public String updateAlumniProfile(@RequestBody Alumni alumni) 
    {
        // Calls the service method to update the profile.
        alumniService.updateAlumniProfile(alumni);
        // Returns a confirmation message.
        return "Alumni profile updated successfully.";
    }

    
    //========================================================================================================
    
    
    // VALIDATE BRANCH
    @GetMapping("/validate/{branchId}")
    public boolean validateBranch(@PathVariable int branchId) 
    {
        return branchService.validateBranchExists(branchId);
    }

    @GetMapping("/name/{branchId}")
    public String getBranchName(@PathVariable int branchId)
    {
        return branchService.fetchBranchName(branchId);
    }



    //---------------------------------------------------------------------------------------------------

  

    @GetMapping("/registered-events/{alumniId}")
    public ResponseEntity<List<Event>> getRegisteredEvents(@PathVariable int alumniId) {
        List<Event> registeredEvents = attendanceService.getRegisteredEventsByAlumniId(alumniId);
        return ResponseEntity.ok(registeredEvents);
    }
    
    @PostMapping("/register-event")
    public ResponseEntity<String> registerToEvent(@RequestBody Map<String, Integer> payload)
    {
        Integer alumniId = payload.get("alumni_id");
        Integer eventId = payload.get("event_id");

        if (alumniId == null || eventId == null) 
        {
            return ResponseEntity.badRequest().body("Missing alumni_id or event_id in request.");
        }

        String message = attendanceService.register(alumniId, eventId);
        return ResponseEntity.ok(message);
    }

    
    @PostMapping("/cancel-registration")
    public ResponseEntity<String> cancelRegistration(@RequestBody Map<String, Integer> payload) 
    {
        Integer alumniId = payload.get("alumni_id");
        Integer eventId = payload.get("event_id");

        if (alumniId == null || eventId == null)
        {
            return ResponseEntity.badRequest().body("Missing alumni_id or event_id in request.");
        }

        try
        {
            attendanceService.cancelRegistration(alumniId, eventId);
            return ResponseEntity.ok("Registration canceled successfully.");
        } 
        catch (IllegalStateException e) {
            return ResponseEntity.status(404).body("Registration not found.");
        }
    }

    
    //===============================================================================================================
    // MANAGE ALUMNI
    @PostMapping("/add")
    public ResponseEntity<?> addAlumni(@RequestBody Alumni alumni)
    {
        if (!branchService.validateBranchExists(alumni.getBranch_id())) 
        {
            return ResponseEntity.status(404).body("Branch ID does not exist.");
        }

        try {
            alumniService.addAlumni(alumni);
            return ResponseEntity.ok("Alumni added successfully.");
        } 
        catch (IllegalArgumentException e) 
        {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getAlumniById(@PathVariable int id) 
    {
        try {
            Alumni alumni = alumniService.getAlumniById(id);
            return ResponseEntity.ok(alumni);
        } 
        catch (NoSuchElementException e)
        {
            return ResponseEntity.status(404).body("Alumni not found.");
        }
    }

    //========================================================================================
    
    

    
    //================================================================================
    @PostMapping("/register")
    public ResponseEntity<String> registerAlumni(@RequestBody Alumni alumni) {
        try {
            alumniService.registerAlumni(alumni);
            return ResponseEntity.ok("Alumni registered successfully.");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public List<Alumni> getAllAlumni() {
        return alumniService.getAllAlumni();
    }

    @GetMapping("/branch/{branchId}")
    public List<Alumni> getAlumniByBranch(@PathVariable int branchId) {
        return alumniService.getAlumniByBranch(branchId);
    }

    @PutMapping("/update")
    public ResponseEntity<String> updateAlumni(@RequestBody Alumni alumni) 
    {
        try {
            alumniService.updateAlumni(alumni);
            return ResponseEntity.ok("Alumni updated successfully.");
        } 
        catch (IllegalArgumentException | NoSuchElementException e)
        {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAlumni(@PathVariable int id) {
        try {
            alumniService.deleteAlumni(id);
            return ResponseEntity.ok("Alumni deleted successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Alumni not found.");
        }
    }

    @GetMapping("/branches")
    public List<Branch> getAllBranches() {
        return alumniService.getAllBranches();
    }
    //------------------------------------------------------------------------------- alumni-ucomming-events
    @GetMapping("/alumni-upcoming-event")
    public ResponseEntity<List<Event>> getUpcomingEvents() {
        List<Event> events = eventService.getUpcomingEvents();
        return ResponseEntity.ok(events);
    }
    
    
    @GetMapping("event/past-events") 
    public List<Event> getPastEvents() 
    {
        return eventService.fetchPastEvents(); // Filter where event_date < CURRENT_DATE
    }
    
    //==========================================================================================================
    
    //Alumni Section
    
    
    @GetMapping("/{alumniId}/attended-events")
    public List<Event> getAttendedEvents(@PathVariable int alumniId) {
        return attendanceService.getAttendedEvents(alumniId);
    }
    @GetMapping("/{alumniId}/attended-event-details")
    public ResponseEntity<List<Event>> getAttendedEventDetails(@PathVariable int alumniId) {
        List<Event> events = attendanceService.getAttendedEvents(alumniId);
        return ResponseEntity.ok(events);
    }
    
    //==============================================================================
    
    @GetMapping("/registered-events/count/{alumniId}")
    public int getRegisteredEventsCount(@PathVariable int alumniId) {
        return alumniService.fetchTotalRegisteredEvents(alumniId);
    }

    @GetMapping("/attended-events/count/{alumniId}")
    public int getAttendedEventsCount(@PathVariable int alumniId) {
        return alumniService.fetchTotalAttendedEvents(alumniId);
    }
    
}
