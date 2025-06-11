package com.alumnisystem.model;


import lombok.Data;

@Data
public class Alumni {

	     private int alumni_id;
	    private String alumni_name;
	    private String password;
	    private String alumni_email;
	    private int passout_year;
	    private Integer branch_id;
	    private String branch_name;
}
