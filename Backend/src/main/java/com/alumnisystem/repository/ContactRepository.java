package com.alumnisystem.repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.alumnisystem.model.ContactMessage;

@Repository
public class ContactRepository {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public int saveMessage(ContactMessage message)
    {
        String sql = "INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, message.getName(), message.getEmail(), message.getMessage());
    }
    
    public List<ContactMessage> findAll() {
        String sql = "SELECT * FROM contact_messages ORDER BY created_at DESC";
        return jdbcTemplate.query(sql, (rs, rowNum) -> mapRow(rs));
    }

    private ContactMessage mapRow(ResultSet rs) throws SQLException {
        ContactMessage msg = new ContactMessage();
        msg.setId(rs.getInt("id"));
        msg.setName(rs.getString("name"));
        msg.setEmail(rs.getString("email"));
        msg.setMessage(rs.getString("message"));
        msg.setCreatedAt(rs.getString("created_at"));
        return msg;
    }
}
