import React, { useState, useEffect } from "react";

function StudentRoster({ classId, studentData }) {
  const classId_m = classId.split(" ")[2]
  const [attendanceRecords, setAttendanceRecords] = useState({}); // State for attendance
  useEffect(() => {
    setAttendanceRecords(
      studentData.reduce((acc, student) => {
        acc[student.user_id] = "present"; // Initial state as present
        return acc;
      }, {})
      );
    }, [studentData]);
    
    const handleAttendanceChange = (user_id, status) => {
      setAttendanceRecords({
        ...attendanceRecords,
        [user_id]: status
      });
    };
    
    const submitAttendance = async () => {
      console.log(attendanceRecords);
      try {
        const attendanceEntries = Object.entries(attendanceRecords).map(([user_id, status]) => ({
          user_id: user_id,
          course_id: classId_m, 
          attendance_date: new Date().toISOString().split('T')[0], // Example: '2023-01-26'
        }));
    
        for (const entry of attendanceEntries) {
          const response = await fetch('http://localhost:3001/attendance/markAttendance', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(entry),
          });
    
          if (!response.ok) {
            throw new Error(`Failed to mark attendance for student ${entry.user_id}`);
          }
    
          const result = await response.json();
          console.log(`Attendance for student ${entry.user_id} submitted successfully:`, result);
        }
    
        alert("All attendance records submitted successfully!");
      } catch (error) {
        console.error("Failed to submit attendance:", error);
        alert(error.message);
      }
    };
    

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-500">Students - {classId}</h2>

      {studentData.length === 0 ? (
        <p>No students enrolled in this class.</p>
      ) : (
        <ul className="mt-4 divide-y divide-gray-200">
          {studentData.map(student => (
            <li key={student.id} className="py-4 flex items-center justify-between">
              <span className="ml-2 text-gray-800">
                {student.user_id} 
              </span>
              <label className="flex items-center">
                <input type="checkbox" className="form-checkbox text-indigo-500" checked={attendanceRecords[student.user_id] === "present"} onChange={event => handleAttendanceChange(student.id, event.target.checked ? "present" : "absent")} />
                <span className="ml-2 text-sm text-gray-600">{attendanceRecords[student.user_id] === "present" ? "Present" : "Absent"}</span>
              </label>
            </li>
          ))}
          <button
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded mt-4"
            onClick={submitAttendance}
          >
            Submit Attendance
          </button>
        </ul>
      )}
    </div>
  );
}

export default StudentRoster;
