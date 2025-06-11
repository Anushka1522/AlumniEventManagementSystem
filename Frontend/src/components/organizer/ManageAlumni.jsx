import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box, Grid, TextField, Button, Select, MenuItem, InputLabel,
  FormControl, Typography, Table, TableHead, TableBody,
  TableRow, TableCell, Paper, Pagination, Stack, Dialog,
  DialogTitle, DialogContent, DialogActions
} from "@mui/material";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import "./css/ManageAlumni.css";

const PAGE_SIZE = 5;

const ManageAlumni = () => {
  const [alumniList, setAlumniList] = useState([]);
  const [branches, setBranches] = useState([]);
  const [view, setView] = useState("register");
  const [filterBranchId, setFilterBranchId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editData, setEditData] = useState(null);

  const [registerData, setRegisterData] = useState({
    alumni_id: "",
    alumni_name: "",
    password: "",
    alumni_email: "",
    passout_year: "",
    branch_id: "",
  });

  useEffect(() => {
    axios.get("http://localhost:8080/api/alumni/branches")
      .then((res) => setBranches(res.data))
      .catch((err) => console.error("Branch fetch error:", err));
  }, []);

  const fetchAlumni = () => {
    const url = filterBranchId
      ? `http://localhost:8080/api/alumni/branch/${filterBranchId}`
      : "http://localhost:8080/api/alumni/all";
    axios.get(url)
      .then((res) => setAlumniList(res.data))
      .catch((err) => console.error("Alumni fetch error:", err));
  };

  useEffect(() => {
    if (view === "show") fetchAlumni();
    setPage(1);
  }, [filterBranchId, view]);

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const resetRegisterForm = () => {
    setRegisterData({
      alumni_id: "",
      alumni_name: "",
      password: "",
      alumni_email: "",
      passout_year: "",
      branch_id: "",
    });
  };

  const handleRegister = () => {
    axios.post("http://localhost:8080/api/alumni/register", registerData)
      .then(() => {
        Swal.fire("Success", "Alumni registered successfully!", "success");
        fetchAlumni();
        resetRegisterForm();
      })
      .catch((err) => {
        const msg = err.response?.data || "Registration failed";
        Swal.fire("Error", msg.includes("already") ? "Alumni ID already exists." : msg, "error");
      });
  };

  const handleEditOpen = (alumni) => {
    setEditData({ ...alumni, password: "" });
    setEditDialogOpen(true);
  };

  const handleEditClose = () => {
    setEditDialogOpen(false);
    setEditData(null);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = () => {
    if (!editData) return;
    const updatePayload = { ...editData };
    if (!updatePayload.password.trim()) delete updatePayload.password;

    axios.put("http://localhost:8080/api/alumni/update", updatePayload)
      .then(() => {
        Swal.fire("Success", "Alumni updated successfully!", "success");
        fetchAlumni();
        handleEditClose();
      })
      .catch((err) => {
        Swal.fire("Error", err.response?.data || "Update failed", "error");
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8080/api/alumni/delete/${id}`)
          .then(() => {
            Swal.fire("Deleted!", "Alumni deleted successfully.", "success");
            fetchAlumni();
          })
          .catch(() => Swal.fire("Error!", "Delete failed", "error"));
      }
    });
  };

  const filteredAlumni = alumniList.filter((a) =>
    a.alumni_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    a.alumni_email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const pageCount = Math.ceil(filteredAlumni.length / PAGE_SIZE);
  const paginatedAlumni = filteredAlumni.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const handlePageChange = (event, value) => setPage(value);

  const getBranchName = (id) => {
    const branch = branches.find((b) => b.branch_id === id);
    return branch ? branch.branch_name : id;
  };

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>Manage Alumni</Typography>

      <Stack direction="row" spacing={2} mb={4}>
        <Button variant={view === "register" ? "contained" : "outlined"} onClick={() => setView("register")}>Register Alumni</Button>
        <Button variant={view === "show" ? "contained" : "outlined"} onClick={() => setView("show")}>Show Alumni</Button>
      </Stack>

      {view === "register" && (
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>Register New Alumni</Typography>
          <Grid container spacing={2}>
            {[
              { label: "Name", name: "alumni_name" },
              { label: "Email", name: "alumni_email" },
              { label: "Password", name: "password" },
              { label: "Passout Year", name: "passout_year" },
            ].map(({ label, name }) => (
              <Grid item xs={12} sm={6} key={name}>
                <TextField fullWidth label={label} name={name} value={registerData[name]} onChange={handleRegisterChange} />
              </Grid>
            ))}

           <Grid item xs={12} sm={6}>
  <FormControl className="custom-branch-select" fullWidth>
    <InputLabel>Branch</InputLabel>
    <Select
      name="branch_id"
      value={registerData.branch_id}
      onChange={handleRegisterChange}
      displayEmpty
    >
      {branches.map((branch) => (
        <MenuItem key={branch.branch_id} value={branch.branch_id}>
          {branch.branch_name}
        </MenuItem>
      ))}
    </Select>
  </FormControl>
</Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleRegister} sx={{ mt: 2 }}>
            Register Alumni
          </Button>
        </Paper>
      )}

      {view === "show" && (
        <>
          <Stack direction="row" spacing={2} mb={2}>
            <FormControl sx={{ minWidth: 180 }}>
              <InputLabel>Branch</InputLabel>
              <Select value={filterBranchId} onChange={(e) => setFilterBranchId(e.target.value)}>
                <MenuItem value="">All Branches</MenuItem>
                {branches.map((branch) => (
                  <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField label="Search by Name or Email" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </Stack>

          <Table component={Paper}>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell><TableCell>Name</TableCell>
                <TableCell>Email</TableCell><TableCell>Year</TableCell>
                <TableCell>Branch</TableCell><TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {paginatedAlumni.map((alumni) => (
                <TableRow key={alumni.alumni_id}>
                  <TableCell>{alumni.alumni_id}</TableCell>
                  <TableCell>{alumni.alumni_name}</TableCell>
                  <TableCell>{alumni.alumni_email}</TableCell>
                  <TableCell>{alumni.passout_year}</TableCell>
                  <TableCell>{getBranchName(alumni.branch_id)}</TableCell>
                  <TableCell>
                    <FaEdit style={{ cursor: "pointer", marginRight: 10 }} onClick={() => handleEditOpen(alumni)} />
                    <FaTrash style={{ cursor: "pointer" }} onClick={() => handleDelete(alumni.alumni_id)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <Stack mt={2} alignItems="center">
            <Pagination count={pageCount} page={page} onChange={handlePageChange} />
          </Stack>

          {/* Edit Dialog */}
          <Dialog open={editDialogOpen} onClose={handleEditClose}>
            <DialogTitle>Edit Alumni</DialogTitle>
            <DialogContent>
              {editData && (
                <Grid container spacing={2} mt={1}>
                  <Grid item xs={12}><TextField label="Name" fullWidth name="alumni_name" value={editData.alumni_name} onChange={handleEditChange} /></Grid>
                  <Grid item xs={12}><TextField label="Email" fullWidth name="alumni_email" value={editData.alumni_email} onChange={handleEditChange} /></Grid>
                  <Grid item xs={12}><TextField label="Password" fullWidth name="password" value={editData.password} onChange={handleEditChange} /></Grid>
                  <Grid item xs={12}><TextField label="Passout Year" fullWidth name="passout_year" value={editData.passout_year} onChange={handleEditChange} /></Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel>Branch</InputLabel>
                      <Select name="branch_id" value={editData.branch_id} onChange={handleEditChange}>
                        {branches.map((branch) => (
                          <MenuItem key={branch.branch_id} value={branch.branch_id}>{branch.branch_name}</MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleEditClose}>Cancel</Button>
              <Button onClick={handleUpdate} variant="contained" color="primary">Update</Button>
            </DialogActions>
          </Dialog>
        </>
      )}
    </Box>
  );
};

export default ManageAlumni;
