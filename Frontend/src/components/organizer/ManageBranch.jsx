import React, { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  TablePagination,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { MdEdit, MdDelete, MdClose, MdCheckCircle, MdErrorOutline } from "react-icons/md";
import axios from "axios";
import "./css/ManageBranch.css";

const ManageBranch = () => {
  const [branches, setBranches] = useState([]);
  const [branchId, setBranchId] = useState("");
  const [branchName, setBranchName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [editing, setEditing] = useState(false);
  const [activeView, setActiveView] = useState("list");

  const [page, setPage] = useState(0);
  const [rowsPerPage] = useState(4);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogType, setDialogType] = useState("success");

  const showDialog = (message, title, type = "success") => {
    setDialogMessage(message);
    setDialogTitle(title);
    setDialogType(type);
    setDialogOpen(true);
  };

  const fetchBranches = () => {
    axios
      .get("http://localhost:8080/api/organizer/branch/all")
      .then((res) => setBranches(res.data))
      .catch(() => showDialog("Error fetching branches", "Error", "error"));
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const isValidNumber = (value) => /^\d+$/.test(value);

  const addBranch = () => {
    if (!isValidNumber(branchId)) {
      showDialog("Branch ID must be a valid number.", "Validation Error", "error");
      return;
    }

    const exists = branches.some((b) => b.branch_id === parseInt(branchId));
    if (exists) {
      showDialog("Branch ID already exists!", "Error", "error");
      return;
    }

    axios
      .post("http://localhost:8080/api/organizer/branch/add", {
        branch_id: parseInt(branchId),
        branch_name: branchName,
      })
      .then(() => {
        resetForm();
        fetchBranches();
        showDialog("Branch added successfully!", "Success", "success");
      })
      .catch(() => showDialog("Error adding branch", "Error", "error"));
  };

  const updateBranch = () => {
    if (!isValidNumber(branchId)) {
      showDialog("Branch ID must be a valid number.", "Validation Error", "error");
      return;
    }

    axios
      .put(`http://localhost:8080/api/organizer/branch/update/${branchId}`, {
        branch_id: parseInt(branchId),
        branch_name: branchName,
      })
      .then(() => {
        resetForm();
        fetchBranches();
        showDialog("Branch updated successfully!", "Success", "success");
        setActiveView("list");
      })
      .catch(() => showDialog("Error updating branch", "Error", "error"));
  };

  const deleteBranch = (id) => {
    if (window.confirm("Are you sure you want to delete this branch?")) {
      axios
        .delete(`http://localhost:8080/api/organizer/branch/delete/${id}`)
        .then(() => {
          fetchBranches();
          showDialog("Branch deleted successfully!", "Success", "success");
        })
        .catch(() => showDialog("Error deleting branch", "Error", "error"));
    }
  };

  const editBranch = (id, name) => {
    setBranchId(id.toString());
    setBranchName(name);
    setEditing(true);
    setActiveView("add");
  };

  const resetForm = () => {
    setBranchId("");
    setBranchName("");
    setEditing(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const filteredBranches = branches.filter((b) =>
    b.branch_id.toString().includes(searchTerm) ||
    b.branch_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedBranches = (activeView === "search" ? filteredBranches : branches).slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const getDialogIcon = () => {
    if (dialogType === "success") return <MdCheckCircle className="dialog-icon success" />;
    return <MdErrorOutline className="dialog-icon error" />;
  };

  return (
    <div className="manage-branch-container">
      <Typography variant="h4" gutterBottom align="center" className="title">
        Manage Branches
      </Typography>

      <div className="nav-buttons">
        <Button
          variant={activeView === "add" ? "contained" : "outlined"}
          onClick={() => {
            resetForm();
            setActiveView("add");
          }}
        >
          Add Branch
        </Button>
        <Button
          variant={activeView === "list" ? "contained" : "outlined"}
          onClick={() => {
            resetForm();
            setSearchTerm("");
            setActiveView("list");
            setPage(0);
          }}
        >
          Show All Branches
        </Button>
        <Button
          variant={activeView === "search" ? "contained" : "outlined"}
          onClick={() => {
            resetForm();
            setActiveView("search");
            setPage(0);
          }}
        >
          Search Branch
        </Button>
      </div>

      {activeView === "add" && (
        <Paper elevation={3} className="form-paper">
          <Typography variant="h6" gutterBottom>
            {editing ? "Update Branch" : "Add New Branch"}
          </Typography>
          <TextField
            label="Branch ID"
            variant="outlined"
            value={branchId}
            onChange={(e) => setBranchId(e.target.value)}
            disabled={editing}
            fullWidth
            className="form-field add"
          />
          <TextField
            label="Branch Name"
            variant="outlined"
            value={branchName}
            onChange={(e) => setBranchName(e.target.value)}
            fullWidth
            className="form-field add"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={editing ? updateBranch : addBranch}
            fullWidth
            className="add"
          >
            {editing ? "Update Branch" : "Add Branch"}
          </Button>
          {editing && (
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              style={{ marginTop: "10px" }}
              onClick={() => {
                resetForm();
                setActiveView("list");
              }}
            >
              Cancel Edit
            </Button>
          )}
        </Paper>
      )}

      {(activeView === "list" || activeView === "search") && (
        <Paper elevation={3} className="table-paper">
          {activeView === "search" && (
            <TextField
              label="Search Branch (by ID or Name)"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(0);
              }}
              fullWidth
              className="search-bar"
            />
          )}
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Branch ID</strong></TableCell>
                  <TableCell><strong>Branch Name</strong></TableCell>
                  <TableCell><strong>Actions</strong></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBranches.map((branch) => (
                  <TableRow key={branch.branch_id} hover>
                    <TableCell>{branch.branch_id}</TableCell>
                    <TableCell>{branch.branch_name}</TableCell>
                    <TableCell>
                      <IconButton onClick={() => editBranch(branch.branch_id, branch.branch_name)} className="edit-icon">
                        <MdEdit />
                      </IconButton>
                      <IconButton onClick={() => deleteBranch(branch.branch_id)} className="delete-icon">
                        <MdDelete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
                {paginatedBranches.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={3} align="center">
                      No branches found.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={(activeView === "search" ? filteredBranches.length : branches.length)}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[4]}
          />
        </Paper>
      )}

      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} className="custom-dialog">
       
        <DialogTitle className={`dialog-title ${dialogType}`}>
          <div className="dialog-header">
            {getDialogIcon()}
            <Typography variant="h6" className="dialog-title-text">{dialogTitle}
            </Typography>
            
            <IconButton onClick={() => setDialogOpen(false)} className="close-button">
              <MdClose />
            </IconButton>
          </div> 
        </DialogTitle>

        <DialogContent className="dialogBox"> 
          <Typography variant="body1"> {dialogMessage} </Typography>
        </DialogContent>
       
      </Dialog>
    </div>
  );
};

export default ManageBranch;
