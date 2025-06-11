package com.alumnisystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnisystem.model.ContactMessage;
import com.alumnisystem.repository.ContactRepository;

@Service
public class ContactService {
    @Autowired
    private ContactRepository contactrepository;

    public void saveMessage(ContactMessage message) {
        contactrepository.saveMessage(message);
    }
    
    
    public List<ContactMessage> getAllMessages() {
        return contactrepository.findAll();
    }
}
