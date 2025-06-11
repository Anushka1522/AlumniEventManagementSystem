package com.alumnisystem.repository;

import com.alumnisystem.model.Event;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.util.List;

@Repository
public class EventRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
 // Save the event
//    public int save(Event event) {
//        String sql = "INSERT INTO event (title, description, event_date, venue, time, organizer_id) "
//                   + "VALUES (?, ?, ?, ?, ?, ?)";
//        return jdbcTemplate.update(sql,
//                event.getTitle(),
//                event.getDescription(),
//                event.getEvent_date(),
//                event.getVenue(),
//                event.getTime(),
//                event.getOrganizer_id());
//    }

    // Check if event with same title and date exists
    public boolean exists(String title, java.util.Date eventDate) {
        String sql = "SELECT COUNT(*) FROM event WHERE title = ? AND event_date = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, title, eventDate);
        return count != null && count > 0;
    }

    // Check if the organizer ID exists
//    public boolean organizerExists(int organizerId) {
//        String sql = "SELECT COUNT(*) FROM organizer WHERE organizer_id = ?";
//        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, organizerId);
//        return count != null && count > 0;
//    }

  
    
    // Optional: Fetch organizer name by ID
    public String getOrganizerName(int organizerId) {
        String sql = "SELECT organizer_name FROM organizer WHERE organizer_id = ?";
        return jdbcTemplate.queryForObject(sql, String.class, organizerId);
    }

    // Optional: Fetch organizer email by ID
    public String getOrganizerEmail(int organizerId) {
        String sql = "SELECT organizer_email FROM organizer WHERE organizer_id = ?";
        return jdbcTemplate.queryForObject(sql, String.class, organizerId);
    }

    //=========================================================================================

    public int save(Event event) 
    {
        String sql = "INSERT INTO event (title, description, event_date, venue, time, organizer_id) "
        		+ "VALUES (?, ?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql, event.getTitle(), event.getDescription(),
        								event.getEvent_date(), event.getVenue(), 
        								event.getTime(), event.getOrganizer_id());
    }

    public List<Event> findAll() 
    {
        String sql = "SELECT * FROM event";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    public List<Event> search(String keyword)
    {
        String sql = "SELECT * FROM event WHERE CAST(event_id AS CHAR) "
        		+ "LIKE ? OR title LIKE ? OR CAST(event_date AS CHAR) LIKE ?";
        String like = "%" + keyword + "%";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class), like, like, like);
    }
    

    public List<Event> sortBy(String field) {
        String sql = "SELECT * FROM event ORDER BY " + field;
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    public List<Event> findByBranch(int branchId) {
        String sql = "SELECT * FROM event WHERE branch_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class), branchId);
    }
    
    //----------------------------------------------------------------------------------

    public List<Event> findPastEvents() {
        String sql = "SELECT * FROM event WHERE event_date < CURRENT_DATE";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    public List<Event> findUpcomingEvents() {
        String sql = "SELECT * FROM event WHERE event_date >= CURRENT_DATE";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }

    //------------------------------------------------------------------------------------
    public int updateEvent(Event event) {
        String sql = "UPDATE event SET title=?, description=?, event_date=?, venue=?, time=? WHERE event_id=?";
        return jdbcTemplate.update(sql, event.getTitle(), 
        		event.getDescription(), event.getEvent_date(), 
        		event.getVenue(), event.getTime(),  event.getEvent_id());
    }

    public int deleteEvent(int eventId) {
        String sql = "DELETE FROM event WHERE event_id=?";
        return jdbcTemplate.update(sql, eventId);
    }

    public boolean exists(String title, Date date)
    {
        String sql = "SELECT COUNT(*) FROM event WHERE title=? AND event_date=?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, title, date);
        return count != null && count > 0;
    }

    public boolean organizerExists(int id)
    {
        String sql = "SELECT COUNT(*) FROM organizer WHERE organizer_id=?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, id);
        return count != null && count > 0;
    }
    
    
    //====================================================================================== alumni event
    public List<Event> getUpcomingEvents()
    {
        String sql = "SELECT * FROM event WHERE event_date > CURDATE() ORDER BY event_date ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }
   
   
    
    public List<Event> getPastEvents()
    {
        String sql = "SELECT * FROM event WHERE event_date < CURDATE() ORDER BY event_date ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class));
    }
    
    
    
    //======================================================================================

    
    public int countAllEvents() 
    {
        String sql = "SELECT COUNT(*) FROM event";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
    //----------------------------------------------------------------------------------------
   
   
}