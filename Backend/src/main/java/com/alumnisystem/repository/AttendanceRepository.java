package com.alumnisystem.repository;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Attendance;
import com.alumnisystem.model.Event;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Repository
public class AttendanceRepository 
{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Add or update attendance record
//    public void markAttendance(Attendance attendance) 
//    {
//        String query = "INSERT INTO attendance (event_id, alumni_id, status) VALUES (?, ?, ?) " +
//                       "ON DUPLICATE KEY UPDATE status = ?";
//        jdbcTemplate.update(query,
//                attendance.getEvent_id(),
//                attendance.getAlumni_id(),
//                attendance.getStatus(),
//                attendance.getStatus());
//    }

    // Get registered alumni for an event
//    public List<Alumni> getRegisteredAlumni(int eventId)
//    {
//        String sql = "SELECT a.* FROM alumni a " +
//                     "JOIN event_registration er ON a.alumni_id = er.alumni_id " +
//                     "WHERE er.event_id = ?";
//        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Alumni.class), eventId);
//    }

    // Get total count of present alumni for an event
    public int getTotalPresent(int eventId) 
    {
        String query = "SELECT COUNT(*) FROM attendance WHERE event_id = ? AND status = 'Present'";
        return jdbcTemplate.queryForObject(query, Integer.class, eventId);
    }

    // Get total count of absent alumni for an event
    public int getTotalAbsent(int eventId) 
    {
        String query = "SELECT COUNT(*) FROM attendance WHERE event_id = ? AND status = 'Absent'";
        return jdbcTemplate.queryForObject(query, Integer.class, eventId);
    }
    
    
    //----------------------------------------------------------------------------------- register event
  
    public List<Event> getRegisteredEventsByAlumniId(int alumniId) 
    {
        String sql = "SELECT e.* FROM event e JOIN attendance a ON e.event_id = a.event_id WHERE a.alumni_id = ?";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class), alumniId);
    }
    
    public boolean isAlreadyRegistered(int alumniId, int eventId)
    {                   
        String sql = "SELECT COUNT(*) FROM attendance WHERE alumni_id = ? AND event_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, alumniId, eventId);
        return count != null && count > 0;
    }
            
    public boolean registerAlumniToEvent(int alumniId, int eventId) 
    {
        String sql = "INSERT INTO attendance (event_id, alumni_id, status) VALUES (?, ?, 'Absent')";
        return jdbcTemplate.update(sql, eventId, alumniId) > 0;
    }
    	
 
    public void cancelRegistration(int alumniId, int eventId) {
        String sql = "DELETE FROM attendance WHERE alumni_id = ? AND event_id = ?";
        jdbcTemplate.update(sql, alumniId, eventId);
    }

 
    // Find attendance by alumniId and eventId
    public Optional<Attendance> findByAlumniIdAndEventId(int alumniId, int eventId) {
        String sql = "SELECT * FROM attendance WHERE alumni_id = ? AND event_id = ?";
        return jdbcTemplate.query(sql, new Object[]{alumniId, eventId}, rs -> {
            if (rs.next()) {
                Attendance attendance = new Attendance();
//                attendance.setId(rs.getInt("id"));
                attendance.setAttendance_id(rs.getInt("attendance_id"));
                attendance.setAlumni_id(rs.getInt("alumni_id"));
                attendance.setEvent_id(rs.getInt("event_id"));
                attendance.setStatus(rs.getString("status"));
                return Optional.of(attendance);
            }
            return Optional.empty();
        });
    }
    
    
    //======================================================================================================= 
    
    
    
    
    
    
    
    private Attendance mapRow(ResultSet rs, int rowNum) throws SQLException {
        Attendance a = new Attendance();
        a.setAttendance_id(rs.getInt("attendance_id"));
        a.setEvent_id(rs.getInt("event_id"));
        a.setAlumni_id(rs.getInt("alumni_id"));
        a.setStatus(rs.getString("status"));
//        a.setAlumni_name(rs.getString("alumni_name"));
//        a.setAlumni_email(rs.getString("alumni_email"));
        return a;
    }


    public int markPresent(int attendanceId) {
        String sql = "UPDATE attendance SET status = 'Present' WHERE attendance_id = ?";
        return jdbcTemplate.update(sql, attendanceId);
    }

    public int countTotal(int eventId) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE event_id = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, eventId);
    }

    public int countPresent(int eventId) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE event_id = ? AND status = 'Present'";
        return jdbcTemplate.queryForObject(sql, Integer.class, eventId);
    }

    public int countAbsent(int eventId) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE event_id = ? AND status = 'Absent'";
        return jdbcTemplate.queryForObject(sql, Integer.class, eventId);
    }
    
    
    //---------------------------------------------------------------------


  //------------------------------------------------------------------------------------
    
    public List<Event> findRegisteredEventsByAlumniId(int alumniId)
    {
        String sql = """
            SELECT e.* FROM event e
            INNER JOIN attendance a ON e.event_id = a.event_id
            WHERE a.alumni_id = ?;
        """; 

        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Event.class), alumniId);
    }
    
//---------------------------------------------------------------------------------------------------
    public String getEventTitleById(int eventId) {
        String sql = "SELECT title FROM event WHERE event_id = ?";
        return jdbcTemplate.queryForObject(sql, String.class, eventId);
    }

    public List<Alumni> getRegisteredAlumni(int eventId) {
        String sql = """
                SELECT a.alumni_id, a.alumni_name, a.alumni_email 
                FROM alumni a 
                JOIN attendance at ON a.alumni_id = at.alumni_id 
                WHERE at.event_id = ?
                """;
        return jdbcTemplate.query(sql, (ResultSet rs, int rowNum) -> {
            Alumni alumni = new Alumni();
            alumni.setAlumni_id(rs.getInt("alumni_id"));
            alumni.setAlumni_name(rs.getString("alumni_name"));
            alumni.setAlumni_email(rs.getString("alumni_email"));
            return alumni;
        }, eventId);
    }
    
    public List<Alumni> fetchAlumniWithBranchByEventId(int eventId) {
        String sql = """
            SELECT a.alumni_id, a.alumni_name, a.alumni_email,
                   a.passout_year, a.branch_id, b.branch_name
            FROM attendance att
            INNER JOIN alumni a ON att.alumni_id = a.alumni_id
            INNER JOIN branch b ON a.branch_id = b.branch_id
            WHERE att.event_id = ?
        """;

        return jdbcTemplate.query(sql, new Object[]{eventId}, (rs, rowNum) -> mapRow(rs));
    }

    private Alumni mapRow(ResultSet rs) throws SQLException {
        Alumni alumni = new Alumni();
        alumni.setAlumni_id(rs.getInt("alumni_id"));
        alumni.setAlumni_name(rs.getString("alumni_name"));
        alumni.setAlumni_email(rs.getString("alumni_email"));
        alumni.setPassout_year(rs.getInt("passout_year"));
        alumni.setBranch_id(rs.getInt("branch_id"));
        alumni.setBranch_name(rs.getString("branch_name"));
        return alumni;
    }
    
    

    public void updateAttendanceStatus(int eventId, int alumniId, String status) {
        String sql = "UPDATE attendance SET status = ? WHERE event_id = ? AND alumni_id = ?";
        jdbcTemplate.update(sql, status, eventId, alumniId);
    }

    public List<Alumni> getAlumniByAttendanceStatus(int eventId, String status) {
        String sql = """
                SELECT a.alumni_id, a.alumni_name, a.alumni_email 
                FROM alumni a 
                JOIN attendance at ON a.alumni_id = at.alumni_id 
                WHERE at.event_id = ? AND at.status = ?
                """;
        return jdbcTemplate.query(sql, (ResultSet rs, int rowNum) -> {
            Alumni alumni = new Alumni();
            alumni.setAlumni_id(rs.getInt("alumni_id"));
            alumni.setAlumni_name(rs.getString("alumni_name"));
            alumni.setAlumni_email(rs.getString("alumni_email"));
            return alumni;
        }, eventId, status);
    }

    public int getCountByStatus(int eventId, String status) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE event_id = ? AND status = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, eventId, status);
    }

    
    public List<Event> getAttendedEventsByAlumniId(int alumniId) {
        String sql = """
            SELECT e.event_id, e.title, e.description, e.event_date, e.organizer_id
            FROM event e
            INNER JOIN attendance a ON e.event_id = a.event_id
            WHERE a.alumni_id = ? AND a.status = 'Present'
        """;

        return jdbcTemplate.query(sql, new Object[]{alumniId}, (rs, rowNum) -> {
            Event event = new Event();
            event.setEvent_id(rs.getInt("event_id"));
            event.setTitle(rs.getString("title"));
            event.setDescription(rs.getString("description"));
            event.setEvent_date(rs.getDate("event_date"));
            event.setOrganizer_id(rs.getInt("organizer_id"));
            return event;
        });
    }
    
    public List<Map<String, Object>> getAttendedEventsByAlumni(int alumniId) {
 
    	String sql = "SELECT e.event_id, e.title AS event_title, e.event_date, a.status " +
                "FROM attendance a " +
                "JOIN event e ON a.event_id = e.event_id " +
                "WHERE a.alumni_id = ? AND a.status = 'Present' " +
                "ORDER BY e.event_date DESC";
        return jdbcTemplate.queryForList(sql, alumniId);
    }

    
    public List<Map<String, Object>> fetchAttendedEventsByAlumni(int alumniId) {
        String sql = """
            SELECT e.event_id, e.title AS event_title, e.event_date, a.status
            FROM attendance a
            JOIN event e ON a.event_id = e.event_id
            WHERE a.alumni_id = ? AND a.status = 'Present'
            ORDER BY e.event_date DESC
        """;

        return jdbcTemplate.queryForList(sql, alumniId);
    }
    
    //======================================
    
    
   
}
