import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ManageEvent.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaEdit, FaTrash, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const ManageEvents = () => {
  const [events, setEvents] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_date: '',
    venue: '',
    time: '',
    organizer_id: '',
  });
  const [editingEventId, setEditingEventId] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('create');

  const eventsPerPage = 5;
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:8080/api/organizer/event/all');
      const sorted = res.data.sort((a, b) => new Date(a.event_date) - new Date(b.event_date));
      setEvents(sorted);
    } catch (err) {
      toast.error('Failed to load events');
    }
  };

  const handleChange = e => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formattedTime = formatTime(formData.time);

    if (!formData.organizer_id || formData.organizer_id <= 0) {
      toast.error('Organizer ID is required');
      return;
    }

    const duplicate = events.find(ev =>
      ev.event_date === formData.event_date &&
      ev.title.toLowerCase() === formData.title.toLowerCase()
    );

    if (!editingEventId && duplicate) {
      toast.warning('Event with same title and date exists');
      return;
    }

    try {
      if (editingEventId) {
        await axios.put('http://localhost:8080/api/organizer/event/update', {
          event_id: editingEventId,
          ...formData,
          time: formattedTime,
        });
        toast.success('Event updated!');
      } else {
        await axios.post('http://localhost:8080/api/organizer/event/create', {
          ...formData,
          time: formattedTime,
        });
        toast.success('Event created!');
      }

      resetForm();
      fetchEvents();
    } catch (err) {
      toast.error('Error saving event');
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      event_date: '',
      venue: '',
      time: '',
      organizer_id: '',
    });
    setEditingEventId(null);
  };

  const handleEdit = event => {
    setFormData({ ...event });
    setEditingEventId(event.event_id);
    setActiveTab('create');
  };

  const handleDelete = async id => {
    try {
      await axios.delete(`http://localhost:8080/api/organizer/event/delete/${id}`);
      toast.success('Event deleted');
      fetchEvents();
    } catch (err) {
      toast.error('Error deleting event');
    }
  };

  const formatTime = time => {
    if (!time) return '00:00:00';
    const [h, m] = time.split(':');
    return `${h}:${m}:00`;
  };

  const filterAndSearchEvents = () => {
    return events.filter(event => {
      const matchesSearch =
        event.title.toLowerCase().includes(search.toLowerCase()) ||
        event.event_date.includes(search);

      const isPast = event.event_date < today;
      const isUpcoming = event.event_date >= today;

      let matchesFilter = true;

      if (activeTab === 'show') {
        if (filterType === 'past') matchesFilter = isPast;
        else if (filterType === 'upcoming') matchesFilter = isUpcoming;
      }

      return matchesSearch && matchesFilter;
    });
  };

  const filteredEvents = filterAndSearchEvents();
  const totalPages = Math.ceil(filteredEvents.length / eventsPerPage);
  const currentEvents = filteredEvents.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );

  return (
    <div className="manage-events-container">
      <ToastContainer />
      <h2>📅 Event Manager</h2>

      <div className="tab-buttons">
        <button
          className={activeTab === 'create' ? 'active' : ''}
          onClick={() => {
            setActiveTab('create');
            setSearch('');
            setCurrentPage(1);
          }}
        >
          Create Event
        </button>
        <button
          className={activeTab === 'show' ? 'active' : ''}
          onClick={() => {
            setActiveTab('show');
            setCurrentPage(1);
          }}
        >
          Show Events
        </button>
      </div>

      {activeTab === 'create' && (
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-row">
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={formData.title}
                onChange={handleChange}
                required
              />
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={formData.description}
                onChange={handleChange}
                required
              />
              <input
                type="date"
                name="event_date"
                value={formData.event_date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-row">
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                value={formData.venue}
                onChange={handleChange}
                required
              />
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
              />
              <input
                type="number"
                name="organizer_id"
                placeholder="Organizer ID"
                value={formData.organizer_id}
                onChange={handleChange}
                required
              />
            </div>
            
            <div className="form-actions">
              {/* <button type="submit">{editingEventId ? 'Update' : 'Create'}</button> */}
               <button
                  type="submit"
                  className={editingEventId ? 'update-mode' : ''}
                >
                  {editingEventId ? 'Update' : 'Create'}
                </button>
              <button type="button" onClick={resetForm}>Clear</button>
            </div>

           
          </form>
        </div>
      )}

      {activeTab === 'show' && (
        <>
          <div className="filter-bar">
            <input
              type="text"
              placeholder="Search Event Name"
              value={search}
              onChange={e => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
            />
            <select value={filterType} onChange={e => setFilterType(e.target.value)}>
              <option value="all">All</option>
              <option value="past">Past</option>
              <option value="upcoming">Upcoming</option>
            </select>
          </div>

          <table className="event-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Date</th>
                <th>Time</th>
                <th>Venue</th>
                <th>Organizer</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEvents.map(event => (
                <tr key={event.event_id}>
                  <td>{event.event_id}</td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.event_date}</td>
                  <td>{event.time}</td>
                  <td>{event.venue}</td>
                  <td>{event.organizer_id}</td>
                  <td>
                    <button onClick={() => handleEdit(event)}><FaEdit /></button>
                    <button onClick={() => handleDelete(event.event_id)} className="delete"><FaTrash /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEvents.length > eventsPerPage && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FaArrowLeft /> Prev
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() =>
                  setCurrentPage(prev => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                Next <FaArrowRight />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ManageEvents;
