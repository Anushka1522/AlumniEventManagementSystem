package com.alumnisystem.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Branch;
import com.alumnisystem.services.BranchService;

@RestController
@RequestMapping("/api/organizer/branch")
@CrossOrigin("http://localhost:5173")
public class BranchController 
{

    @Autowired
    private BranchService branchService;


    
    // POST - Add Branch
    @PostMapping("/add")
    public String addBranch(@RequestBody Branch branch) {
        // Ensure branchId is valid and branchName is not empty
        return branchService.addBranch(branch.getBranch_id(), branch.getBranch_name().trim());
    }

    // PUT - Update Branch
    @PutMapping("/update/{id}")
    public String updateBranch(@PathVariable int id, @RequestBody Branch branch) {
        // Ensure the branchName is not empty
        return branchService.updateBranch(id, branch.getBranch_name().trim());
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBranch(@PathVariable int id) {
        return branchService.deleteBranch(id);
    }

    @GetMapping("/all")
    public List<Branch> getAllBranches() {
        return branchService.getAllBranches();
    }

    @GetMapping("/alumni/{branchId}") 
    public List<Alumni> getAlumniByBranch(@PathVariable int branchId) {
        return branchService.getAlumniByBranch(branchId);
    }

    @GetMapping("/{id}")
    public Branch getBranchById(@PathVariable int id) {
        return branchService.getBranchById(id);
    }
    
    
//    @GetMapping("/{id}")
//    public ResponseEntity<Branch> getBranchNameById(@PathVariable int id) {
//        Branch branch = branchRepository.getBranchById(id);
//        if (branch == null) {
//            return ResponseEntity.notFound().build();
//        }
//        return ResponseEntity.ok(branch);
//    }
}