package com.alumnisystem.model;

import java.util.List;

import lombok.Data;

@Data
public class AttendanceResponse {

	 private String eventTitle;
	    private int presentCount;
	    private int absentCount;
	    private List<Alumni> presentAlumni;
	    private List<Alumni> absentAlumni;
}
