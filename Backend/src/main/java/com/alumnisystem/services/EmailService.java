package com.alumnisystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

	 @Autowired
	    private JavaMailSender mailSender;

	    public void sendEventCreationEmail(String toEmail, String eventTitle, String eventDate, String organizerName) {
	        SimpleMailMessage message = new SimpleMailMessage();
	        message.setTo(toEmail);
	        message.setSubject("New Event Created: " + eventTitle);
	        message.setText("Dear User,\n\nOrganizer " + organizerName + " has created a new event: " +
	                eventTitle + " on " + eventDate + ".\n\nThank you,\nAlumni Event Management Team");

	        mailSender.send(message);
	    }
}