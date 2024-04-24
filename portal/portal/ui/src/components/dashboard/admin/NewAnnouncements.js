import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

function Announcements() {
  const [message, setMessage] = useState("");
  const [expiryDate, setExpiryDate] = useState(null);
  const [editId, setEditId] = useState(null);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get("http://localhost:3001/announcement");
        console.log("Data", response.data);
        setAnnouncements(response.data);
      } catch (error) {
        console.error("Error fetching announcements:", error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleDelete = async announcementId => {
    try {
      const response = await axios.delete(`http://localhost:3001/announcement/${announcementId}`);
      if (response.status === 200) {
        setAnnouncements(announcements.filter(ann => ann.announcements_id !== announcementId));
      } else {
        alert("Error deleting announcement");
      }
    } catch (error) {
      console.error("Delete Error:", error);
    }
  };

  const handleEdit = announcement => {
    setMessage(announcement.message);
    setExpiryDate(announcement.expiryDate);
    setEditId(announcement.announcements_id);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (editId) {
      axios
        .put(`http://localhost:3001/announcement/${editId}`, { message, expiry_date: expiryDate })
        .then(response => {
          setAnnouncements(announcements.map(ann => (ann.announcements_id === editId ? { ...ann, message, expiryDate } : ann)));
          setEditId(null);
          setMessage("");
          setExpiryDate(null);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    } else {
      // Create a new announcement
      axios
        .post("http://localhost:3001/announcement", { message, expiry_date: expiryDate })
        .then(response => {
          setAnnouncements([...announcements, { message, expiryDate }]);
          setMessage("");
          setExpiryDate(null);
          console.log(response);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">{editId ? "Edit" : "Create"} Announcement</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
            Message:
          </label>
          <textarea id="message" rows="4" value={message} onChange={e => setMessage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>

        <div className="mb-6">
          <label htmlFor="expiry" className="block text-gray-700 text-sm font-bold mb-2">
            Expiry Date:
          </label>
          <DatePicker
            id="expiry"
            selected={expiryDate}
            onChange={date => {
              const dateString = date.toISOString().split("T")[0];
              setExpiryDate(dateString);
            }}
            dateFormat="yyyy-mm-dd"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          {editId ? "Update" : "Create"} Announcement
        </button>
      </form>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Previous Announcements</h2>
      <ul>
        {announcements.length === 0 && <li>No announcements found</li>}
        {announcements.length > 0 &&
          announcements.map(ann => (
            <li key={ann.announcements_id} className="mb-4 border p-4 rounded shadow-md">
              <p className="text-lg">{ann.message}</p>
              <p className="text-sm text-gray-500">Expires:{ann.expiryDate} </p>
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2" onClick={() => handleDelete(ann.announcements_id)}>
                Delete
              </button>
              <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => handleEdit(ann)}>
                Edit
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default Announcements;
