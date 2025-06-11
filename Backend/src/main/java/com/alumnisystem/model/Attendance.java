package com.alumnisystem.model;

import lombok.Data;

@Data
public class Attendance {
    private int attendance_id;
    private int event_id;
    private int alumni_id;
    private String status;// present and absent
  
}