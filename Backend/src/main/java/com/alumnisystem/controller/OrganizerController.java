package com.alumnisystem.controller;

import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Attendance;
import com.alumnisystem.model.Branch;
import com.alumnisystem.model.Event;
import com.alumnisystem.model.Organizer;
import com.alumnisystem.services.AttendanceService;
import com.alumnisystem.services.BranchService;
import com.alumnisystem.services.EventService;
import com.alumnisystem.services.OrganizerService;

@RestController
@RequestMapping("/api/organizer")
@CrossOrigin("http://localhost:5173")
public class OrganizerController
{

    @Autowired
    private OrganizerService organizerService;

    @Autowired
    private EventService eventService;

 
    @Autowired
    private BranchService branchService;
    
    @Autowired
    private  AttendanceService attendanceService;
    //--------------------------------------------------------------------- login or register of organizer
    
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Organizer organizer) 
    {
        boolean status = organizerService.registerOrganizer(organizer);
        return status ?  
        		ResponseEntity.ok("Registered Successfully") :
        		ResponseEntity.status(400).body("Registration failed");
    }

    
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body)
    {
        Organizer org = organizerService.loginOrganizer(body.get("email"), body.get("password"));
        return org != null ? 
        		ResponseEntity.ok(org) : 
        		ResponseEntity.status(401).body("Invalid Credentials"); 
    }   
    
    //--------------------------------------------------------------------- CRUD Organizer
    
    
    @GetMapping("/{id}")
    public Organizer getOrganizer(@PathVariable int id) {
        return organizerService.getOrganizer(id);
    }

    @PutMapping("/update")
    public String updateOrganizer(@RequestBody Organizer organizer) 
    {
        return organizerService.updateOrganizer(organizer);
    }

    @DeleteMapping("/{id}")
    public String deleteOrganizer(@PathVariable int id)
    {
        return organizerService.deleteOrganizer(id);
    }
    
    
    
    @GetMapping("/branchName/{id}")
    public ResponseEntity<Organizer> getOrganizerById(@PathVariable int id) {
        Organizer organizer = organizerService.getOrganizerById(id);

        // Fetch branch name and set it
        Branch branch = branchService.getBranchById(organizer.getBranch_id());
        organizer.setBranch_name(branch.getBranch_name()); // ✅ This line is essential

        return ResponseEntity.ok(organizer);
    }
    
   
    //---------------------------------------------------------------------------------
//    @Autowired
//    private EventService eventService;

//    @PostMapping("/event/create")
//    public String createEvent(@RequestBody Event event) {
//        return eventService.createEvent(event);
//    }
    @PostMapping("/event/create")
    public String createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @GetMapping("/event/all")
    public List<Event> getAllEvents() {
        return eventService.fetchAllEvents();
    }

    @GetMapping("/event/search/{keyword}")
    public List<Event> searchEvents(@PathVariable String keyword) {
        return eventService.searchEvents(keyword);
    }

    @GetMapping("/event/sort/{field}")
    public List<Event> sortEvents(@PathVariable String field) {
        return eventService.sortEvents(field);
    }

    @GetMapping("/event/branch/{branchId}")
    public List<Event> getEventsByBranch(@PathVariable int branchId) {
        return eventService.fetchEventsByBranch(branchId);
    }

    @GetMapping("/event/past")
    public List<Event> getPastEvents() {
        return eventService.fetchPastEvents();
    }

    @GetMapping("/event/upcoming")
    public List<Event> getUpcomingEvents() {
        return eventService.fetchUpcomingEvents();
    }

    @PutMapping("/event/update")
    public String updateEvent(@RequestBody Event event) {
        return eventService.updateEvent(event);
    }

    @DeleteMapping("/event/delete/{id}")
    public String deleteEvent(@PathVariable int id) {
        return eventService.deleteEvent(id);
    }
    
    @GetMapping("/event/branch/all")
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }
    
    
    //====================================================== dashboard organizer
    	
    @GetMapping("/dashboard/Event-total-Count")
    public ResponseEntity<Integer> getTotalEventCount() {
        int count = eventService.getTotalEventCount();
        return ResponseEntity.ok(count);
    }
    
    @GetMapping("/dashboard/{organizerId}")
    public ResponseEntity<Organizer> getOrganizerDetails(@PathVariable int organizerId) {
        Organizer organizer = organizerService.getOrganizerById(organizerId);
        return ResponseEntity.ok(organizer);
    }

    @GetMapping("/dashboard/{organizerId}/eventCount")
    public ResponseEntity<Integer> getEventCountByOrganizer(@PathVariable int organizerId) {
        int count = organizerService.getEventCountByOrganizer(organizerId);
        return ResponseEntity.ok(count);
    }
    
    //----------------------------------------------------------------------- track attendance
    

    
    
 
}
