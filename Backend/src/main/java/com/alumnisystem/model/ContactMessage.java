package com.alumnisystem.model;

import lombok.Data;

@Data
public class ContactMessage {

	   private int id;
	    private String name;
	    private String email;
	    private String message;
	    private String createdAt;
}
