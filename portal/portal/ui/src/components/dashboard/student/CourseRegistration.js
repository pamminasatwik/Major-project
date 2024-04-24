import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import CourseForm from "./CourseForm";

function CourseRegistration() {
  const [courses, setCourses] = useState([])
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("data"));
    if (userData && userData.user && userData.user.role) {
       if (userData.user.role === "student") {
        setUserId(userData.user.user_id)
      }
    }
  }, []);
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/courses/sem/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log(data)
        setCourses(data)
      })
  }, [id]) // Adding id as a dependency to refetch when id changes

  return (
    <div className="flex justify-center items-center pt-10 pb-10 bg-gray-100">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-blue-600 mb-4">Course Registration</h1>
        <p className="text-center text-gray-700 mb-8">Registering for course with ID: <span className="font-semibold">{id}</span></p>
        <CourseForm courses={courses} userId={userId} />
      </div>
    </div>
  )
}

export default CourseRegistration;
