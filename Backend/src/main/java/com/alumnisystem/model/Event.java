package com.alumnisystem.model;

import java.sql.Date;

import lombok.Data;

import lombok.Data;

import java.sql.Date;
import java.sql.Time;

@Data
public class Event
{
    private int event_id;
    private String title;
    private String description;
    private Date event_date;
    private String venue;
    private Time time;
    private int organizer_id;
    private int branch_id;
    
    
   
    
}
