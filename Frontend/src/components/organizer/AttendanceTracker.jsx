import React, { useState } from 'react';
import axios from 'axios';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import './css/AttendanceTracker.css';

const AttendanceTracker = () => {
  const [activeTab, setActiveTab] = useState('mark');
  const [eventId, setEventId] = useState('');
  const [alumniList, setAlumniList] = useState([]);
  const [attendanceMap, setAttendanceMap] = useState({});
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [viewSection, setViewSection] = useState('');
  const itemsPerPage = 5;
  const BASE_URL = 'http://localhost:8080/api/attendance';

  const fetchAlumni = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/mark/${eventId}`);
      if (Array.isArray(res.data) && res.data.length > 0) {
        setAlumniList(res.data);
        setAttendanceMap({});
        setMessage('');
        setCurrentPage(1);
      } else {
        setAlumniList([]);
        setMessage('Event does not exist or has no registered alumni.');
      }
    } catch (err) {
      setAlumniList([]);
      setMessage('Error fetching alumni or event does not exist.');
    }
  };

  const submitAttendance = async () => {
    try {
      for (const [alumniId, status] of Object.entries(attendanceMap)) {
        await axios.post(`${BASE_URL}/mark`, null, {
          params: { eventId, alumniId, status },
        });
      }
      setMessage('✅ Attendance submitted successfully.');
    } catch (err) {
      setMessage('❌ Error submitting attendance.');
    }
  };

  const handleStatusChange = (alumniId, status) => {
    setAttendanceMap((prev) => ({ ...prev, [alumniId]: status }));
  };

  const fetchReport = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/report/${eventId}`);
      if (res.data && res.data.eventTitle) {
        setReport(res.data);
        setMessage('');
        setViewSection('');
      } else {
        setReport(null);
        setMessage('Event does not exist.');
      }
    } catch (err) {
      setReport(null);
      setMessage('Error fetching attendance report.');
    }
  };

  const exportToExcel = () => {
    if (!report) return;
    const presentSheet = XLSX.utils.json_to_sheet(report.presentAlumni);
    const absentSheet = XLSX.utils.json_to_sheet(report.absentAlumni);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, presentSheet, 'Present Alumni');
    XLSX.utils.book_append_sheet(wb, absentSheet, 'Absent Alumni');
    const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    saveAs(
      new Blob([wbout], { type: 'application/octet-stream' }),
      `${report.eventTitle}_Attendance.xlsx`
    );
  };

  const totalPages = Math.ceil(alumniList.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAlumni = alumniList.slice(indexOfFirstItem, indexOfLastItem);

  const isSubmitDisabled =
    alumniList.length === 0 ||
    Object.keys(attendanceMap).length !== alumniList.length ||
    Object.values(attendanceMap).includes('');

  return (
    <div className="attendance-container">
      <h2 className="title">Attendance Tracker</h2>

      <div className="tabs">
        <button
          className={activeTab === 'mark' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('mark');
            setReport(null);
            setMessage('');
            setViewSection('');
          }}
        >
          Mark Attendance
        </button>
        <button
          className={activeTab === 'report' ? 'tab active' : 'tab'}
          onClick={() => {
            setActiveTab('report');
            setAlumniList([]);
            setMessage('');
            setAttendanceMap({});
          }}
        >
          View Report
        </button>
      </div>

      <div className="input-section">
        <input
          type="number"
          placeholder="Enter Event ID"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
        />
        <button onClick={activeTab === 'mark' ? fetchAlumni : fetchReport}>
          {activeTab === 'mark' ? 'Fetch Alumni' : 'Get Report'}
        </button>
      </div>

      {activeTab === 'mark' && currentAlumni.length > 0 && (
        <>
          <h3>Registered Alumni</h3>
          <table className="custom-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {currentAlumni.map((alumni) => (
                <tr key={alumni.alumni_id}>
                  <td>{alumni.alumni_id}</td>
                  <td>{alumni.alumni_name}</td>
                  <td>{alumni.alumni_email}</td>
                  <td>{alumni.branch_name}</td>
                  <td>
                    <select
                      onChange={(e) =>
                        handleStatusChange(alumni.alumni_id, e.target.value)
                      }
                      defaultValue={attendanceMap[alumni.alumni_id] || ''}
                    >
                      <option value="">Select</option>
                      <option value="Present">Present</option>
                      <option value="Absent">Absent</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
            >
              Next
            </button>
          </div>

          <div className="submit-container">
            <button
              onClick={submitAttendance}
              disabled={isSubmitDisabled}
              className={isSubmitDisabled ? 'disabled' : ''}
            >
              Submit Attendance
            </button>
          </div>
        </>
      )}

      {activeTab === 'report' && report && (
        <div className="report-section">
          <h3>Event Report</h3>

          <div className="report-buttons">
            <button onClick={() => setViewSection('present')}>
              Show Present
            </button>
            <button onClick={() => setViewSection('absent')}>
              Show Absent
            </button>
            <button onClick={() => setViewSection('registered')}>
              Show All
            </button>
            <button onClick={exportToExcel}>Export to Excel</button>
          </div>

          {viewSection === 'present' && (
            <div className="report-table">
              <h4>Present Alumni</h4>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {report.presentAlumni.map((a) => (
                    <tr key={a.alumni_id}>
                      <td>{a.alumni_id}</td>
                      <td>{a.alumni_name}</td>
                      <td>{a.alumni_email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewSection === 'absent' && (
            <div className="report-table">
              <h4>Absent Alumni</h4>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {report.absentAlumni.map((a) => (
                    <tr key={a.alumni_id}>
                      <td>{a.alumni_id}</td>
                      <td>{a.alumni_name}</td>
                      <td>{a.alumni_email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {viewSection === 'registered' && (
            <div className="report-table">
              <h4>All Registered Alumni</h4>
              <table className="custom-table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ...report.presentAlumni.map((a) => ({
                      ...a,
                      status: 'Present',
                    })),
                    ...report.absentAlumni.map((a) => ({
                      ...a,
                      status: 'Absent',
                    })),
                  ].map((a) => (
                    <tr key={a.alumni_id}>
                      <td>{a.alumni_id}</td>
                      <td>{a.alumni_name}</td>
                      <td>{a.alumni_email}</td>
                      <td>{a.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default AttendanceTracker;

