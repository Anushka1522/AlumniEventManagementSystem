package com.alumnisystem.model;

import lombok.Data;

@Data
public class Organizer
{

	   private int organizer_id;
	    private String organizer_name;
	    private String password;
	    private String organizer_email;
	    private int branch_id;
	    private String branch_name;
}
