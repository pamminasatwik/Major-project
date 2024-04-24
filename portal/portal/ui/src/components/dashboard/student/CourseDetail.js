import React , { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CourseDetail() {
    const { id } = useParams(); // Get the course ID from URL parameters
    const [course, setCourse] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
  
    useEffect(() => {
      fetch(`http://localhost:3001/courses/${id}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCourse(data);
          setIsLoading(false);
        })
        .catch(error => {
          setError(error.message);
          setIsLoading(false);
        });
    }, [id]); // Dependency array with `id` to refetch if the ID changes
  
    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
  
  return (
    <div className="max-w-xl mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h2 className="text-4xl font-bold mb-4">{course.course_name}</h2>
      <ul className="list-disc pl-5 space-y-2">
        <li><strong>Course ID:</strong> {course.course_id}</li>
        <li><strong>Semester:</strong> {course.sem}</li>
        <li><strong>Credits:</strong> {course.course_credit}</li>
        <li><strong>Eligibility:</strong> {course.course_eligibility}</li>
        <li><strong>Type:</strong> {course.course_type}</li>
        <li><strong>Faculty ID:</strong> {course.faculty_id}</li>
        <li><strong>Available Seats:</strong> {course.available_seats}</li>
        <li><strong>Syllabus:</strong> {course.course_syllabus}</li>
      </ul>
    </div>
  );
}

export default CourseDetail;
