package com.alumnisystem.services;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Attendance;
import com.alumnisystem.model.AttendanceResponse;
import com.alumnisystem.model.Event;
import com.alumnisystem.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

   
    public int getTotalPresent(int eventId) 
    {
        return attendanceRepository.getTotalPresent(eventId);
    }

    public int getTotalAbsent(int eventId)
    {
        return attendanceRepository.getTotalAbsent(eventId);
    }
    
    //-----------------------------------------------
 // 🔹 Service method to fetch registered events

    public String register(int alumniId, int eventId)
    {
        if (attendanceRepository.isAlreadyRegistered(alumniId, eventId))
        {
            return "❌ Alumni is already registered for this event.";
        }
        boolean result = attendanceRepository.registerAlumniToEvent(alumniId, eventId);
        return result ? "✅ Registration successful." : "❌ Registration failed.";
    }
    


    public void cancelRegistration(int alumniId, int eventId)
    {
        if (attendanceRepository.findByAlumniIdAndEventId(alumniId, eventId).isEmpty())
        {
            throw new IllegalStateException("No registration found for the given alumni and event.");
        }
        attendanceRepository.cancelRegistration(alumniId, eventId);
    }
    
    
    
    //====================================================================================
    


    public boolean markAsPresent(int attendanceId) 
    {
        return attendanceRepository.markPresent(attendanceId) > 0;
    }

    public Map<String, Integer> getAttendanceSummary(int eventId) 
    {
        Map<String, Integer> summary = new HashMap<>();
        summary.put("total", attendanceRepository.countTotal(eventId));
        summary.put("present", attendanceRepository.countPresent(eventId));
        summary.put("absent", attendanceRepository.countAbsent(eventId));
        return summary;
    }
    
    
    //=======================================================================================


    
    public List<Event> getRegisteredEventsByAlumniId(int alumniId) {
        return attendanceRepository.findRegisteredEventsByAlumniId(alumniId);
    }
    
    //--------------------------------------------------------------------------------------
    
    public String getEventTitle(int eventId) {
        return attendanceRepository.getEventTitleById(eventId);
    }


    public void markAttendance(int eventId, int alumniId, String status) {
    	attendanceRepository.updateAttendanceStatus(eventId, alumniId, status);
    }
    
    public List<Alumni> getRegisteredAlumni(int eventId) {
        return attendanceRepository.fetchAlumniWithBranchByEventId(eventId);
    }
    

    public AttendanceResponse getAttendanceReport(int eventId) {
        String title = attendanceRepository.getEventTitleById(eventId);
        int present = attendanceRepository.getCountByStatus(eventId, "Present");
        int absent = attendanceRepository.getCountByStatus(eventId, "Absent");
        List<Alumni> presentList = attendanceRepository.getAlumniByAttendanceStatus(eventId, "Present");
        List<Alumni> absentList = attendanceRepository.getAlumniByAttendanceStatus(eventId, "Absent");

        AttendanceResponse response = new AttendanceResponse();
        response.setEventTitle(title);
        response.setPresentCount(present);
        response.setAbsentCount(absent);
        response.setPresentAlumni(presentList);
        response.setAbsentAlumni(absentList);
        return response;
    }
    
    
    
   public List<Event> getAttendedEvents(int alumniId) {
        return attendanceRepository.getAttendedEventsByAlumniId(alumniId);
    }
    
    public List<Map<String, Object>> getAttendedEventsByAlumni(int alumniId) {
        return attendanceRepository.getAttendedEventsByAlumni(alumniId);
    }
    

 
}
