import React, { useState, useEffect } from "react";

function AttendanceMetrics({userId}) {
  const [attendanceData, setAttendanceData] = useState([
    { day: "Mon", status: "present" },
    { day: "Tue", status: "absent" },
    { day: "Wed", status: "present" },
    { day: "Thu", status: "present" },
    { day: "Fri", status: "present" },
    { day: "Sat", status: "present" }
  ]);

  useEffect(()=>{
    const fetchAttendanceMetrics = async () => {
      const response = await fetch(`http://localhost:3001/attendance/attendanceReport/${userId}`);
      const data = await response.json();
      console.log(data.attendance);
      if(data.attendance != []){
        // TODO: once data is filled 
        // setAttendanceData(data)
      }
    }
    fetchAttendanceMetrics();
  },[userId])

  const calculateAttendancePercentage = () => {
    const totalDays = attendanceData.length;
    const presentDays = attendanceData.filter(day => day.status === "present").length;
    return (presentDays / totalDays) * 100;
  };

  const overallPercentage = calculateAttendancePercentage();

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-indigo-500">Attendance (This Week)</h2>

      <div className="grid grid-cols-6 gap-2 mb-4">
        {attendanceData.map(day => (
          <div key={day.day} className={`h-8 w-8 rounded-full text-center text-white ${day.status === "present" ? "bg-green-500" : "bg-red-500"}`}>
            {day.day.slice(0, 1)}
          </div>
        ))}
      </div>

      <div className="relative pt-1">
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-indigo-200">
          <div style={{ width: `${overallPercentage}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"></div>
        </div>
        <p className="text-right">Overall: {overallPercentage.toFixed(1)}%</p>
      </div>
    </div>
  );
}

export default AttendanceMetrics;
