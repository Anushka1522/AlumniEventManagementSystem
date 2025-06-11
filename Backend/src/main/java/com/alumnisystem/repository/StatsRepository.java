package com.alumnisystem.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class StatsRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int countAlumni() {
        String sql = "SELECT COUNT(*) FROM alumni";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int countOrganizers() {
        String sql = "SELECT COUNT(*) FROM organizer";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int countEvents() {
        String sql = "SELECT COUNT(*) FROM event";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }

    public int getAlumniEngagementYears() {
        String sql = "SELECT MAX(passout_year) - MIN(passout_year) + 1 FROM alumni";
        return jdbcTemplate.queryForObject(sql, Integer.class);
    }
}