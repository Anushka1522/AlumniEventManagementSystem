package com.alumnisystem.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnisystem.exception.ResourceNotFoundException;
import com.alumnisystem.exception.ValidationException;
import com.alumnisystem.model.Organizer;
import com.alumnisystem.repository.BranchRepository;
import com.alumnisystem.repository.OrganizerRepository;

@Service
public class OrganizerService {

    @Autowired
    private OrganizerRepository organizerRepository;
    

    @Autowired
    private BranchRepository branchRepository;
    
    //-------------------------------------------------------------------------------- login , register

    public boolean registerOrganizer(Organizer organizer)
    {
        return organizerRepository.register(organizer) > 0;
    }

    public Organizer loginOrganizer(String email, String password)
    {
        return organizerRepository.login(email, password);
    }
    
    //-------------------------------------------------------------------------------------- crud organizer profile
    

    public Organizer getOrganizer(int id) 
    {
        Organizer org = organizerRepository.getOrganizerById(id);
        if (org == null) throw new ResourceNotFoundException("Organizer not found with ID: " + id);
        return org;
    }

    public String updateOrganizer(Organizer org) 
    {
        if (org.getOrganizer_email() == null || !org.getOrganizer_email().contains("@"))
        {
            throw new ValidationException("Invalid email.");
        } 
        
        if (!branchRepository.existsById(org.getBranch_id()))
        {
            throw new ValidationException("Branch does not exist.");
        }

        int rows = organizerRepository.updateOrganizer(org);
        if (rows == 0) throw new ResourceNotFoundException("Update failed. Organizer not found.");
        return "Organizer updated successfully.";
    }

    public String deleteOrganizer(int id) 
    { 
        int rows = organizerRepository.deleteOrganizer(id);
        if (rows == 0) throw new ResourceNotFoundException("No organizer found to delete.");
        return "Organizer deleted successfully.";
    }    
    
    
    //===================================================dashboard
   
    
    public Organizer getOrganizerById(int id)
    {
        return organizerRepository.findById(id);
    }

    public int getEventCountByOrganizer(int id) {
        return organizerRepository.countEventsByOrganizer(id);
    }
}
