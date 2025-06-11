package com.alumnisystem.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnisystem.model.StatsResponse;
import com.alumnisystem.repository.StatsRepository;

@Service
public class StatsService {

    @Autowired
    private StatsRepository statsRepository;

    public StatsResponse getStatistics() {
        int totalAlumni = statsRepository.countAlumni();
        int totalOrganizers = statsRepository.countOrganizers();
        int totalEvents = statsRepository.countEvents();
        int totalYears = statsRepository.getAlumniEngagementYears();

        return new StatsResponse(totalAlumni, totalOrganizers, totalEvents, totalYears);
    }
}