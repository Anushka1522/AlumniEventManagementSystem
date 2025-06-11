package com.alumnisystem.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.alumnisystem.model.Alumni;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Repository
public class AlumniRepository
{

    @Autowired
    private JdbcTemplate jdbcTemplate;



    
    // Method to check if the alumni exists by email and password
    public Alumni loginAlumni(String alumniEmail, String password) 
    {
        String sql = "SELECT * FROM alumni WHERE alumni_email = ? AND password = ?";
        List<Alumni> list = jdbcTemplate.query(sql, new Object[]{alumniEmail, password}, 
        		new BeanPropertyRowMapper<>(Alumni.class));
        
        return list.isEmpty() ? null : list.get(0);
    }
    
    
    //-------------------------------------------------------------------------------
    
    // Method to map the result set from the database to an Alumni object.

    private Alumni mapRow(ResultSet rs) throws SQLException {
        Alumni alumni = new Alumni();
        alumni.setAlumni_id(rs.getInt("alumni_id"));
        alumni.setAlumni_name(rs.getString("alumni_name"));
        alumni.setPassword(rs.getString("password")); // or "password_hash" based on your schema
        alumni.setAlumni_email(rs.getString("alumni_email"));
        alumni.setPassout_year(rs.getInt("passout_year"));
        alumni.setBranch_id(rs.getInt("branch_id"));
        alumni.setBranch_name(rs.getString("branch_name")); // ✅ This is essential

        return alumni;
    }
    
    // Method to retrieve an alumni's profile based on alumniId.
    public Alumni getProfileById(int alumniId) {
         // SQL query to get alumni details by joining the alumni and branch tables.
       String sql = "SELECT a.alumni_id, a.alumni_name,  a.password, " +
               "a.alumni_email, a.passout_year, a.branch_id, b.branch_name " +
               "FROM alumni a JOIN branch b ON a.branch_id = b.branch_id " +
               "WHERE a.alumni_id = ?";

         // Uses JdbcTemplate to execute the query and map the result to an Alumni object.
        return jdbcTemplate.queryForObject(sql, (rs, rowNum) -> mapRow(rs), alumniId);
    }

    
    
    // Method to update an alumni's profile information.
    public int updateProfile(Alumni alumni)
    {
        String sql = "UPDATE alumni SET alumni_name=?, alumni_email=?, password=? WHERE alumni_id=?";
        // Executes the update SQL query using JdbcTemplate and returns the number of affected rows.
        return jdbcTemplate.update(sql,
            alumni.getAlumni_name(),
            alumni.getAlumni_email(),
            alumni.getPassword(),
            alumni.getAlumni_id()
        );
    }
    

    
    //================================================================


    // Get all alumni records
    public List<Alumni> getAllAlumni() {
        String sql = "SELECT * FROM alumni";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Alumni.class));
    }

 // Get all alumni sorted by passout year
    public List<Alumni> findAllSortedByPassoutYear() {
        String sql = "SELECT * FROM alumni ORDER BY passout_year ASC";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Alumni.class));
    }
    //=============================================================================================================
    

    //==========================================================================================================
    
    
    
    
    
    

    public int save(Alumni alumni) {
        String sql = "INSERT INTO alumni (alumni_name, password, alumni_email, passout_year, branch_id) VALUES (?, ?, ?, ?, ?)";
        return jdbcTemplate.update(sql,
                alumni.getAlumni_name(),
                alumni.getPassword(),
                alumni.getAlumni_email(),
                alumni.getPassout_year(),
                alumni.getBranch_id());
    }

    public List<Alumni> findAll() {
        String sql = "SELECT * FROM alumni";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Alumni.class));
    }

    public List<Alumni> findByBranchId(int branchId) {
        String sql = "SELECT * FROM alumni WHERE branch_id = ?";
        return jdbcTemplate.query(sql, new Object[]{branchId}, new BeanPropertyRowMapper<>(Alumni.class));
    }

    public Alumni findById(int id) {
        String sql = "SELECT * FROM alumni WHERE alumni_id = ?";
        List<Alumni> list = jdbcTemplate.query(sql, new Object[]{id}, new BeanPropertyRowMapper<>(Alumni.class));
        return list.isEmpty() ? null : list.get(0);
    }

    public int update(Alumni alumni) {
        String sql = "UPDATE alumni SET alumni_name=?, password=?, alumni_email=?, passout_year=?, branch_id=? WHERE alumni_id=?";
        return jdbcTemplate.update(sql,
                alumni.getAlumni_name(),
                alumni.getPassword(),
                alumni.getAlumni_email(),
                alumni.getPassout_year(),
                alumni.getBranch_id(),
                alumni.getAlumni_id());
    }

    public int delete(int id) {
        String sql = "DELETE FROM alumni WHERE alumni_id = ?";
        return jdbcTemplate.update(sql, id);
    }
    
    //==================================================================
    
    public int getTotalRegisteredEvents(int alumniId) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE alumni_id = ?";
        return jdbcTemplate.queryForObject(sql, Integer.class, alumniId);
    }

    public int getTotalAttendedEvents(int alumniId) {
        String sql = "SELECT COUNT(*) FROM attendance WHERE alumni_id = ? AND status = 'Present'";
        return jdbcTemplate.queryForObject(sql, Integer.class, alumniId);
    }
}
