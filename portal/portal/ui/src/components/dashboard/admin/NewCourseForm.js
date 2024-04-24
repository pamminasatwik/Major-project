import React, { useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function CourseRegistration() {
  const [success, setSuccess] = useState(false);
  const [sem, setSem] = useState();
  const [expiryDate, setExpiryDate] = useState(null);
  const [courses, setCourses] = useState([
    {
      course_id: "",
      course_name: "",
      course_credit: -1,
      course_eligibility: -1,
      course_type: "mandatory",
      faculty_id: "",
      available_seats: -1,
      course_syllabus: ""
    }
  ]);

  const handleInputChange = (index, event) => {
    const values = [...courses];
    values[index][event.target.name] = event.target.value;
    setCourses(values);
  };

  const addCourse = () => {
    setCourses([
      ...courses,
      {
        course_id: "",
        course_name: "",
        course_credit: -1,
        course_eligibility: -1,
        course_type: "mandatory",
        faculty_id: "",
        available_seats: -1,
        course_syllabus: ""
      }
    ]);
  };

  const deleteCourse = index => {
    setCourses(courses.filter((_, i) => i !== index));
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log({ sem, courses });
    try {
      const response = await axios.post("http://localhost:3001/courses", { sem, courses });
      console.log(response.data);
      setSuccess(true);
      axios
        .post("http://localhost:3001/announcement", { message:`New Course Registration form -> http://localhost:3000/course-form/${sem}`, expiry_date: expiryDate })
        .then(response => {
          console.log(response);
        })
        .catch(error => {
          console.error("There was an error!", error);
        });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Course Registration</h1>
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Success!</strong>
          <span className="block sm:inline"> Your Course has been created.</span>
          <span className="block sm:inline"> link: {`http://localhost:3000/course-form/${sem}`} </span>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor={`course_id_`} className="block text-sm font-medium">
            Semester:
          </label>
          <input placeholder="IV - 2024" type="text" id="course_id" name="course_id" value={sem} onChange={event => setSem(event.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
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
        {courses.map((course, index) => (
          <div key={index} className="mb-6 border p-4 rounded">
            <div className="mb-4">
              <label htmlFor={`course_id_${index}`} className="block text-sm font-medium">
                Course ID:
              </label>
              <input type="text" id={`course_id_${index}`} name="course_id" value={course.course_id} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`course_name_${index}`} className="block text-sm font-medium">
                Course Name:
              </label>
              <input type="text" id={`course_name_${index}`} name="course_name" value={course.course_name} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`course_credit_${index}`} className="block text-sm font-medium">
                Course Credits:
              </label>
              <input type="number" id={`course_credit_${index}`} name="course_credit" value={course.course_credit} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`course_eligibility_${index}`} className="block text-sm font-medium">
                Course Eligibility:
              </label>
              <input type="text" id={`course_eligibility_${index}`} name="course_eligibility" value={course.course_eligibility} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`faculty_id_${index}`} className="block text-sm font-medium">
                Faculty Id:
              </label>
              <input type="text" id={`faculty_id_${index}`} name="faculty_id" value={course.faculty_id} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`available_seats_${index}`} className="block text-sm font-medium">
                Available Seats:
              </label>
              <input type="number" id={`available_seats_${index}`} name="available_seats" value={course.available_seats} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4">
              <label htmlFor={`course_syllabus_${index}`} className="block text-sm font-medium">
                Course Syllabus:
              </label>
              <input type="text" id={`course_syllabus_${index}`} name="course_syllabus" value={course.course_syllabus} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
            </div>
            <div className="mb-4 col-span-2">
              <label htmlFor={`course_type_${index}`} className="block text-sm font-medium">
                Course Type:
              </label>
              <select id={`course_type_${index}`} name="course_type" value={course.course_type} onChange={event => handleInputChange(index, event)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                <option value="mandatory">Mandatory</option>
                <option value="open elective">Open Elective</option>
                <option value="professional elective">Professional Elective</option>
              </select>
            </div>
            <button type="button" onClick={() => deleteCourse(index)} className="bg-red-500 hover:bg-red-700 text-white font-medium py-1 px-3 rounded">
              Delete Course
            </button>
          </div>
        ))}
        <button type="button" onClick={addCourse} className="bg-green-500 hover:bg-green-700 text-white font-medium py-2 px-4 rounded">
          Add Course
        </button>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Submit Registration
        </button>
      </form>
    </div>
  );
}

export default CourseRegistration;
