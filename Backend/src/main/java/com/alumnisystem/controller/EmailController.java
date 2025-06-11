package com.alumnisystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.services.EmailService;

@RestController
@RequestMapping("/email")
@CrossOrigin(origins = "*")
public class EmailController {

    @Autowired
    private EmailService emailService;

    @GetMapping("/test")
    public String sendTestEmail(
            @RequestParam String to,
            @RequestParam String eventTitle,
            @RequestParam String eventDate,
            @RequestParam String organizerName
    ) {
        try {
            emailService.sendEventCreationEmail(to, eventTitle, eventDate, organizerName);
            return "Test email sent to: " + to;
        } catch (Exception e) {
            return "Failed to send email: " + e.getMessage();
        }
    }
}