package com.alumnisystem.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.model.StatsResponse;
import com.alumnisystem.services.StatsService;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*") // Adjust if needed
public class StatsController {

    @Autowired
    private StatsService statsService;

    @GetMapping("/overview")
    public StatsResponse getStatsOverview() {
        return statsService.getStatistics();
    }
}