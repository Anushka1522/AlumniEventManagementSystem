package com.alumnisystem.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.model.ContactMessage;
import com.alumnisystem.services.ContactService;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:3000")
public class ContactController
{
    @Autowired
    private ContactService contactService;
    
    @PostMapping("/receiveMessage")
    public ResponseEntity<String> receiveMessage(@RequestBody ContactMessage message) 
    {
        contactService.saveMessage(message);
        return ResponseEntity.ok("Message received successfully");
    }
    
    @GetMapping("/AllMessages")
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        List<ContactMessage> messages = contactService.getAllMessages();
        return ResponseEntity.ok(messages);
    }
}
 