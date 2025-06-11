package com.alumnisystem.repository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Branch;

@Repository
public class BranchRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;
    
    
    public List<Branch> findAll() {
        String sql = "SELECT * FROM branch";
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Branch.class));
    }
   
    
    //-----------------------------------------------------------------------------------

    public boolean existsById(int branchId)
    {
        String sql = "SELECT COUNT(*) FROM branch WHERE branch_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, new Object[]{branchId}, Integer.class);
        return count != null && count > 0;
    }

    public String getBranchNameById(int branchId)
    {
        String sql = "SELECT branch_name FROM branch WHERE branch_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{branchId}, String.class);
    }
    
    
    public Branch getBranchById(int id) {
        String sql = "SELECT * FROM branch WHERE branch_id = ?";
        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Branch branch = new Branch();
            branch.setBranch_id(rs.getInt("branch_id"));
            branch.setBranch_name(rs.getString("branch_name"));
            return branch;
        });
    }
    //=========================================================================================== Manage Branch
    
    public int addBranch(int branchId, String branchName) {
        String sql = "INSERT INTO branch (branch_id, branch_name) VALUES (?, ?)";
        return jdbcTemplate.update(sql, branchId, branchName);
    }

    public int updateBranch(int branchId, String branchName) {
        String sql = "UPDATE branch SET branch_name = ? WHERE branch_id = ?";
        return jdbcTemplate.update(sql, branchName, branchId);
    }

    public int deleteBranch(int branchId) {
        String sql = "DELETE FROM branch WHERE branch_id = ?";
        return jdbcTemplate.update(sql, branchId);
    }

    public Branch findBranchByNameIgnoreCase(String branchName) {
        String sql = "SELECT * FROM branch WHERE LOWER(branch_name) = LOWER(?)";
        List<Branch> branches = jdbcTemplate.query(sql, new Object[]{branchName},
            (rs, rowNum) -> {
                Branch b = new Branch();
                b.setBranch_id(rs.getInt("branch_id"));
                b.setBranch_name(rs.getString("branch_name"));
                return b;
            });
        return branches.isEmpty() ? null : branches.get(0);
    }

    public Branch findBranchById(int branchId) {
        String sql = "SELECT * FROM branch WHERE branch_id = ?";
        List<Branch> branches = jdbcTemplate.query(sql, new Object[]{branchId},
            (rs, rowNum) -> {
                Branch b = new Branch();
                b.setBranch_id(rs.getInt("branch_id"));
                b.setBranch_name(rs.getString("branch_name"));
                return b;
            });
        return branches.isEmpty() ? null : branches.get(0);
    }

    public List<Branch> getAllBranches() {
        String sql = "SELECT * FROM branch";
        return jdbcTemplate.query(sql,
            (rs, rowNum) -> {
                Branch b = new Branch();
                b.setBranch_id(rs.getInt("branch_id"));
                b.setBranch_name(rs.getString("branch_name"));
                return b;
            });
    }

    public List<Alumni> findAlumniByBranchId(int branchId) {
        String sql = "SELECT * FROM alumni WHERE branch_id = ?";
        return jdbcTemplate.query(sql, new Object[]{branchId},
            (rs, rowNum) -> {
                Alumni a = new Alumni();
                a.setAlumni_id(rs.getInt("alumni_id"));
                a.setAlumni_name(rs.getString("alumni_name"));
                a.setAlumni_email(rs.getString("alumni_email"));
                a.setPassout_year(rs.getInt("passout_year"));
                a.setBranch_id(rs.getInt("branch_id"));
                a.setPassword(rs.getString("password"));
                return a;
            });
    }
    
}