package com.alumnisystem.services;

import com.alumnisystem.model.Event;
import com.alumnisystem.repository.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.List;

@Service
public class EventService {

    @Autowired
    private EventRepository eventRepository;
    
    @Autowired
    private EmailService emailService;

    public String createEvent(Event event) {
        if (!eventRepository.organizerExists(event.getOrganizer_id())) {
            return "Invalid Organizer ID.";
        }

        if (eventRepository.exists(event.getTitle(), event.getEvent_date())) {
            return "Event already exists on this date with same title.";
        }

        int res = eventRepository.save(event);

        if (res > 0) {
            // ✅ Format event_date from java.util.Date or java.sql.Date to String
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
            String eventDateStr = sdf.format(event.getEvent_date());

            // ✅ Organizer name and email (for now, you can hardcode it or fetch from DB)
            String organizerName = "Organizer Name"; // You can fetch from DB based on organizer_id
            String recipientEmail = "recipient@example.com"; // Hardcode or load dynamically

            // ✅ Send email
            emailService.sendEventCreationEmail(
                recipientEmail,
                event.getTitle(),
                eventDateStr,
                organizerName
            );

            return "Event created successfully and email sent.";
        } else {
            return "Event creation failed.";
        }
    
}
    
    
    
    //=====================================================================================

//    public String createEvent(Event event) {
//        if (!eventRepository.organizerExists(event.getOrganizer_id())) {
//            return "Invalid Organizer ID.";
//        }
//        if (eventRepository.exists(event.getTitle(), event.getEvent_date())) {
//            return "Event already exists on this date with same title.";
//        }
//        int res = eventRepository.save(event);
//        return res > 0 ? "Event created successfully." : "Event creation failed.";
//    }

    public List<Event> fetchAllEvents() {
        return eventRepository.findAll();
    }

    public List<Event> searchEvents(String keyword) {
        return eventRepository.search(keyword);
    }

    public List<Event> sortEvents(String field) {
        return eventRepository.sortBy(field);
    }

    public List<Event> fetchEventsByBranch(int branchId) {
        return eventRepository.findByBranch(branchId);
    }

    //----------------------------------------
    public List<Event> fetchPastEvents() {
        return eventRepository.findPastEvents();
    }



    public List<Event> fetchUpcomingEvents() {
        return eventRepository.findUpcomingEvents();
    }

    //----------------------------------------------------
    public String updateEvent(Event event) {
        int res = eventRepository.updateEvent(event);
        return res > 0 ? "Event updated successfully." : "Event update failed.";
    }

    public String deleteEvent(int id) {
        int res = eventRepository.deleteEvent(id);
        return res > 0 ? "Event deleted successfully." : "Event deletion failed.";
    }
    //===========================================================
    public List<Event> getUpcomingEvents() {
        return eventRepository.getUpcomingEvents();
    }
    
    //===========================================================================================
    
    public int getTotalEventCount() {
        return eventRepository.countAllEvents();
    }
}