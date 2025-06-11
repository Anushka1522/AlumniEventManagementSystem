package com.alumnisystem.services;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Branch;
import com.alumnisystem.model.Event;
import com.alumnisystem.repository.AlumniRepository;
import com.alumnisystem.repository.AttendanceRepository;
import com.alumnisystem.repository.BranchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@Service
public class AlumniService {

    @Autowired
    private AttendanceRepository attendanceRepository;
	
    @Autowired
    private AlumniRepository alumniRepository;

    @Autowired
    private BranchRepository branchRepository;
    
    
    // Method to fetch the alumni profile by their ID.
    public Alumni getAlumniProfile(int alumniId) {
        // Calls the repository method to get the profile by ID.
        return alumniRepository.getProfileById(alumniId);
    }

    // Method to update the alumni profile.
    public void updateAlumniProfile(Alumni alumni) {
        // Calls the repository method to update the profile.
        alumniRepository.updateProfile(alumni);
    }

    
    
    
    //==========================================================================================================
  
    // Method to login alumni by checking email and password
    public Alumni loginAlumni(String alumniEmail, String password)
    {
        Alumni alumni = alumniRepository.loginAlumni(alumniEmail, password);
        
        if (alumni == null) 
        {
            throw new NoSuchElementException("Invalid credentials");
        }
        return alumni;
    }


    public void addAlumni(Alumni alumni)
    {
        if (!branchRepository.existsById(alumni.getBranch_id())) 
        {
            throw new IllegalArgumentException("Branch does not exist.");
        }
        alumniRepository.save(alumni);
    }

    
    ///=================================================================
    public void registerAlumni(Alumni alumni) {
        if (!branchRepository.existsById(alumni.getBranch_id())) {
            throw new IllegalArgumentException("Invalid branch ID.");
        }
        alumniRepository.save(alumni);
    }

    public List<Alumni> getAllAlumni() {
        return alumniRepository.findAll();
    }

    public List<Alumni> getAlumniByBranch(int branchId) {
        return alumniRepository.findByBranchId(branchId);
    }

    public Alumni getAlumniById(int id) {
        Alumni alumni = alumniRepository.findById(id);
        if (alumni == null) throw new NoSuchElementException("Alumni not found");
        return alumni;
    }

    public void updateAlumni(Alumni alumni) {
        if (!branchRepository.existsById(alumni.getBranch_id())) {
            throw new IllegalArgumentException("Invalid branch ID.");
        }
        alumniRepository.update(alumni);
    }

    public void deleteAlumni(int id) {
        alumniRepository.delete(id);
    }

    public List<Branch> getAllBranches() {
        return branchRepository.findAll();
    }
   //-----------------------------------------------------------------------------------------
    public int fetchTotalRegisteredEvents(int alumniId) {
        return alumniRepository.getTotalRegisteredEvents(alumniId);
    }

    public int fetchTotalAttendedEvents(int alumniId) {
        return alumniRepository.getTotalAttendedEvents(alumniId);
    }
}
