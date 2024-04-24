import React, { useState, useEffect } from "react";

function CourseDropdown({ course, onCourseChange }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredcourse, setFilteredcourse] = useState(course);

  useEffect(() => {
    const filtercourse = () => {
      if (searchTerm.trim() === "") {
        setFilteredcourse(course); // Reset to original list
        return;
      }
      const filtered = course.filter(cls => cls.course_name.toLowerCase().includes(searchTerm.toLowerCase()));
      setFilteredcourse(filtered);
    };

    filtercourse();
  }, [searchTerm, course]); // Trigger filtering on search term or course change

  return (
    <div>
      <label htmlFor="search" className="block text-sm font-medium text-gray-700">
        Search course:
      </label>
      <input id="search" type="text" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />

      <label htmlFor="course-select" className="block text-sm font-medium text-gray-700 mt-2">
        Select course:
      </label>
      <select id="course-select" onChange={e => onCourseChange(e.target.value)} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
        {filteredcourse.map(cls => (
          <option key={cls.id} value={cls.id}>
            {cls.course_name} - {cls.course_id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default CourseDropdown;
