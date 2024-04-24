import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData && userData.user && userData.user.role) {
      if (userData.user.role === "admin") {
        setUsername(`${userData.user.first_name} ${userData.user.last_name}`);
      } else if (userData.user.role === "student") {
        navigate("/dashboard/student");
      }
    }
  }, []);
  const [firstName, lastName] = username.split(" ");
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center mb-8">
        <Avatar name={`${firstName} ${lastName}`} size="48" round={true} />
        <h1 className="text-4xl pl-2 font-bold text-indigo-600">Hello, {username}</h1>
      </div>

      <h2 className="text-2xl font-bold mb-8 text-indigo-500">Admin Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/new-course-registration">New Course Registration</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/new-course-registration-approval">New Course Registration Approval's</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/achievement-upload">Achievement Upload Form</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/achievement-upload-approval">Achievement Uploaded Approval's</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/announcements">Create Announcement</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/attendance">Attendance</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/dashboard/admin/attendance-summary">Attendance Summary</Link>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Link to="/">More...</Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
