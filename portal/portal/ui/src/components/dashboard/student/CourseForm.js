import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function CourseForm({courses,userId}) {

  const [selectedCourses, setSelectedCourses] = useState({});

  // Categorize courses
  const categories = {
    mandatory: courses.filter(course => course.course_type === "mandatory"),
    openElective: courses.filter(course => course.course_type === "open elective"),
    professionalElective: courses.filter(course => course.course_type === "professional elective"),
  };

  // Handle change in course selection
  const handleCourseSelection = (e, course) => {
    const { checked } = e.target;
    setSelectedCourses(prev => ({
      ...prev,
      [course.course_id]: checked ? course : undefined,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const courseIds = Object.entries(selectedCourses)
                            .filter(([_, isSelected]) => isSelected)
                            .map(([courseId, _]) => courseId);
  
    if (courseIds.length === 0) {
      console.error("No courses selected");
      return; 
    }
    console.log(courseIds);
    async function getAvailableSeats(courseId) {
        try {
          const response = await fetch(`http://localhost:3001/courses/seats/${courseId}`);
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
          const {available_seats} = await response.json();
          return available_seats;
        } catch (error) {
          console.error('Failed to fetch available seats:', error);
        }
      }

      async function updateSeats(courseId, currentSeats) {
        try {
          const newSeats = currentSeats - 1; // Decrement the current seats by 1
          const response = await fetch(`http://localhost:3001/courses/updateSeats/${courseId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ available_seats: newSeats }),
          });
      
          if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
          }
      
          console.log(`Seats updated successfully for course ID ${courseId}. New available seats: ${newSeats}`);
        } catch (error) {
          console.error('Failed to update seats:', error);
        }
      }
            
      async function enrollInCoursesSequential(courseIds) {
        for (const courseId of courseIds) {
          try {
            const availableSeats = await getAvailableSeats(courseId);
            if (availableSeats != null && availableSeats > 0) {
              await updateSeats(courseId, availableSeats);
              console.log(`Successfully enrolled in course ${courseId}.`);
            } else {
              console.log(`No seats available for course ${courseId}.`);
            }
          } catch (error) {
            console.error(`Failed to enroll in course ${courseId}:`, error);
          }
        }
      }
      
    try {
      const response = await fetch('http://localhost:3001/courses/enroll', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          student_id: userId,
          course_ids: courseIds,
        }),
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      enrollInCoursesSequential(courseIds);
      alert("Enrollment successful");
      // Handle success
    } catch (error) {
        alert("Enrollment failed");
      // Handle errors
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {Object.entries(categories).map(([categoryName, courses]) => (
        <div key={categoryName} className="p-4 border rounded-lg shadow-md">
          <h2 className="text-lg font-bold capitalize">{categoryName.replace(/([A-Z])/g, ' $1').trim()}</h2>
          {courses.map(course => (
            <div key={course.course_id} className="flex items-center mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={!!selectedCourses[course.course_id]}
                  onChange={(e) => handleCourseSelection(e, course)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <a
                href={`/course/${course.course_id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600"
                >
                {course.course_name}
                </a>
                <span> {"->"} (Credits: {course.course_credit}) (Available Seats: {course.available_seats})</span>
              </label>
            </div>
          ))}
        </div>
      ))}
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-700">Submit</button>
    </form>
  );
}

export default CourseForm;
