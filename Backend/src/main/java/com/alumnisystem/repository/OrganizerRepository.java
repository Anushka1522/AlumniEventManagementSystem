package com.alumnisystem.repository;


import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import com.alumnisystem.model.Organizer;

@Repository
public class OrganizerRepository 
{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    //----------------------------------------------------- register organizer
    public int register(Organizer organizer)
    {
        String sql = "INSERT INTO organizer (organizer_name, password, organizer_email, branch_id) VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(sql, 
					        		organizer.getOrganizer_name(), 
					        		organizer.getPassword(),
					        		organizer.getOrganizer_email(), 
					        		organizer.getBranch_id());
					    }

    public Organizer login(String email, String password)
    {
        String sql = "SELECT * FROM organizer WHERE organizer_email = ? AND password = ?";
       try 
        {
            return jdbcTemplate.queryForObject(sql, 
				            		new Object[]{email, password}, 
				            		 new BeanPropertyRowMapper<>(Organizer.class));
        } 
        catch (Exception e)
        { 
            return null;
        }
    }
    
    //---------------------------------------------------------------------------- CRUD Operations
    private Organizer mapRow(ResultSet rs, int rowNum) throws SQLException 
    {
        Organizer org = new Organizer();
        org.setOrganizer_id(rs.getInt("organizer_id"));
        org.setOrganizer_name(rs.getString("organizer_name"));
        org.setPassword(rs.getString("password"));
        org.setOrganizer_email(rs.getString("organizer_email"));
        org.setBranch_id(rs.getInt("branch_id"));
        return org;
    }

    public Organizer getOrganizerById(int id)
    {
        String sql = "SELECT * FROM organizer WHERE organizer_id = ?";
        return jdbcTemplate.query(sql, new Object[]{id}, this::mapRow).stream().findFirst().orElse(null);
    }

    public int updateOrganizer(Organizer org) 
    {
        String sql = "UPDATE organizer SET organizer_name=?, organizer_email=?, password=?, branch_id=? WHERE organizer_id=?";
        return jdbcTemplate.update(sql, org.getOrganizer_name(), org.getOrganizer_email(), org.getPassword(), org.getBranch_id(), org.getOrganizer_id());
    }

    public int deleteOrganizer(int id)
    {
        String sql = "DELETE FROM organizer WHERE organizer_id = ?";
        return jdbcTemplate.update(sql, id);
    }    
    //-------------------------------------------------------------------------------------  dashboard
    
    public Organizer findById(int id) {
        String sql = "SELECT * FROM organizer WHERE organizer_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Organizer.class));
    }

    public int countEventsByOrganizer(int id) {
        String sql = "SELECT COUNT(*) FROM event WHERE organizer_id = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, id);
    }
 
}
