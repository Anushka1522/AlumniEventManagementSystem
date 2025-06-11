package com.alumnisystem.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alumnisystem.model.Alumni;
import com.alumnisystem.model.Branch;
import com.alumnisystem.repository.BranchRepository;

@Service
public class BranchService {

    @Autowired
    private BranchRepository branchRepository;

    public boolean validateBranchExists(int branchId)
    {
        return branchRepository.existsById(branchId);
    }

    public String fetchBranchName(int branchId)
    {
        return branchRepository.getBranchNameById(branchId);
    }
    
    //===================================================================================  Manage Branch
    
    public String addBranch(int branchId, String branchName) {
        Branch existing = branchRepository.findBranchById(branchId);
        if (existing != null) {
            return "Branch with this ID already exists.";
        }

        Branch nameCheck = branchRepository.findBranchByNameIgnoreCase(branchName);
        if (nameCheck != null) {
            return "Branch with this name already exists.";
        }

        int rows = branchRepository.addBranch(branchId, branchName);
        return rows > 0 ? "Branch added successfully." : "Failed to add branch.";
    }

    public String updateBranch(int branchId, String branchName) {
        Branch existing = branchRepository.findBranchById(branchId);
        if (existing == null) {
            return "Branch not found.";
        }

        int rows = branchRepository.updateBranch(branchId, branchName);
        return rows > 0 ? "Branch updated successfully." : "Failed to update branch.";
    }

    public String deleteBranch(int branchId) {
        Branch existing = branchRepository.findBranchById(branchId);
        if (existing == null) {
            return "Branch not found.";
        }

        int rows = branchRepository.deleteBranch(branchId);
        return rows > 0 ? "Branch deleted successfully." : "Failed to delete branch.";
    }

    public List<Branch> getAllBranches() {
        return branchRepository.getAllBranches();
    }

    public List<Alumni> getAlumniByBranch(int branchId) {
        return branchRepository.findAlumniByBranchId(branchId);
    }

    public Branch getBranchById(int branchId) {
        return branchRepository.findBranchById(branchId);
    }
}