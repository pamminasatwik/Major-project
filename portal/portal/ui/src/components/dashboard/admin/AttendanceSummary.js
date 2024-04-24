import React, { useState, useEffect } from 'react';

function AttendanceSummary() {
  // State to store the fetched attendance data
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    // Function to fetch attendance data
    const fetchAttendanceData = async () => {
      try {
        const response = await fetch('http://localhost:3001/attendance/fullAttendanceReport'); // Update with your actual API URL
        if (!response.ok) {
          throw new Error('Failed to fetch attendance data');
        }
        const data = await response.json();
        setAttendanceData(data.attendance); // Assuming the data structure matches your API output
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      }
    };

    fetchAttendanceData();
  }, []); // Empty dependency array means this effect runs once on mount

  return (
    <div className="flex justify-center items-center pt-10">
      <div className="w-full max-w-4xl mx-auto">
        <h2 className="text-lg font-semibold mb-4 text-center text-gray-700">Attendance Summary</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2">User ID</th>
                <th className="px-4 py-2">Course ID</th>
                <th className="px-4 py-2">Attendance Date</th>
              </tr>
            </thead>
            <tbody>
              {attendanceData.length > 0 ? (
                attendanceData.map((record) => (
                  <tr key={record.id} className="bg-white border-b">
                    <td className="px-4 py-2 text-center">{record.user_id}</td>
                    <td className="px-4 py-2 text-center">{record.course_id}</td>
                    <td className="px-4 py-2 text-center">{new Date(record.attendance_date).toLocaleDateString()}</td>
                  </tr>
                ))
              ) : (
                <tr><td className="px-4 py-2 text-center" colSpan="3">No attendance records found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>

  );
}

export default AttendanceSummary;
