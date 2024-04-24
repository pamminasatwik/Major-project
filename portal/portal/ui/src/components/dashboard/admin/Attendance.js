import React, { useState, useEffect } from "react";
import CourseDropdown from "./CourseDropdown";
import StudentRoster from "./StudentRoster";

function Attendance() {
  const [course, setCourse] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [studentData, setStudentData] = useState([]);

  useEffect(() => {
    const fetchcourse = async () => {
      const response = await fetch("http://localhost:3001/courses");
      const data = await response.json();
      setCourse(data);
    };
    fetchcourse();
  }, []);

  useEffect(() => {
    const fetchStudents = async () => {
      if (selectedCourse) {
        const course_id = selectedCourse.split(" ")[2]
        const response = await fetch(`http://localhost:3001/courses/enroll/${course_id}`);
        const data = await response.json();
        setStudentData(data);
      } else {
        setStudentData([]);
      }
    };
    fetchStudents();
  }, [selectedCourse]);

  return (
    <div className="container p-6 rounded-lg shadow-md bg-white mx-auto">
      <h1 className="text-3xl font-bold mb-8">Attendance Management</h1>
      <CourseDropdown course={course} onCourseChange={setSelectedCourse} />
      {selectedCourse && <StudentRoster classId={selectedCourse} studentData={studentData} />}
    </div>
  );
}

export default Attendance;
