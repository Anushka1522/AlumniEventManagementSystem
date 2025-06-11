package com.alumnisystem.model;

//package org.AlumniEvent.model;

public class StatsResponse {
    private int totalAlumni;
    private int totalOrganizers;
    private int totalEvents;
    private int totalYears;

    public StatsResponse(int totalAlumni, int totalOrganizers, int totalEvents, int totalYears) {
        this.totalAlumni = totalAlumni;
        this.totalOrganizers = totalOrganizers;
        this.totalEvents = totalEvents;
        this.totalYears = totalYears;
    }

    // Getters and setters
    public int getTotalAlumni() {
        return totalAlumni;
    }

    public void setTotalAlumni(int totalAlumni) {
        this.totalAlumni = totalAlumni;
    }

    public int getTotalOrganizers() {
        return totalOrganizers;
    }

    public void setTotalOrganizers(int totalOrganizers) {
        this.totalOrganizers = totalOrganizers;
    }

    public int getTotalEvents() {
        return totalEvents;
    }

    public void setTotalEvents(int totalEvents) {
        this.totalEvents = totalEvents;
    }

    public int getTotalYears() {
        return totalYears;
    }

    public void setTotalYears(int totalYears) {
        this.totalYears = totalYears;
    }
}
