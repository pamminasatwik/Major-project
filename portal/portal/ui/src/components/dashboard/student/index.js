import React, { useState, useEffect } from "react";
import Avatar from "react-avatar";
import Statistics from "./Statistics";
import Achievements from "./Achievements";
import Announcements from "./Announcements";
import AttendanceMetrics from "./AttendanceMetrics";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData && userData.user && userData.user.role) {
       if (userData.user.role === "student") {
        setUsername(`${userData.user.first_name} ${userData.user.last_name}`);
        setUserId(userData.user.user_id)
      }
    }
  }, []);
  const [firstName, lastName] = username.split(" ");
  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center ">
        <Avatar name={`${firstName} ${lastName}`} size="48" round={true} />
        <h1 className="text-4xl pl-2 font-bold text-indigo-600">Hello, {username}</h1>
      </div>
      <p className="text-sm pl-2 font-bold text-indigo-600 ml-12 mb-8">{userId}</p>

      <h2 className="text-2xl font-bold mb-8 text-indigo-500">Student Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <Statistics />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Announcements />
        </div>
        <div className="bg-white p-6 rounded shadow">
          <Achievements userId={userId}/>
        </div>
        <div className="bg-white p-6 rounded shadow">
          <AttendanceMetrics userId={userId} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
