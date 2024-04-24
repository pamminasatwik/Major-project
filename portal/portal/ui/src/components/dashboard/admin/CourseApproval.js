// import React, { useState, useEffect } from "react";

// function FacultyDashboard() {
//   const [courses, setCourses] = useState([]);

//   const [search, setSearch] = useState("");

//   useEffect(() => {
//     const fetchPendingCourses = async () => {
//       const response = await fetch("http://localhost:3001/courses/enroll");
//       const data = await response.json();
//       setCourses(data);
//     };
//     fetchPendingCourses();
//   }, []);

//   const handleSearchChange = event => {
//     setSearch(event.target.value);
//   };

//   const handleApprove = course => {
//     // Add your approve logic here
//   };

//   const handleModify = course => {
//     // Add your modify logic here
//   };

//   const handleBulkApprove = () => {
//     // Add your bulk approve logic here
//   };

//   const filteredCourses = courses.filter(course => course.name.toLowerCase().includes(search.toLowerCase()));

//   return (
//     <div className="container mx-auto p-6">
//       <h1 className="text-3xl font-bold mb-8">Course Approval</h1>
//       {courses.length === 0 ? (
//         <p>No pending courses.</p>
//       ) : (
//         <>
//           <input type="text" placeholder="Search rno." value={search} onChange={handleSearchChange} className="mb-6 p-2 border rounded" />

//           <button onClick={handleBulkApprove} className="mb-6 bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
//             Bulk Approve
//           </button>

//           <table className="w-full table-auto">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2">Select</th>
//                 <th className="px-4 py-2">Role Number</th>
//                 <th className="px-4 py-2">Course 1</th>
//                 <th className="px-4 py-2">Course 2</th>
//                 <th className="px-4 py-2">Course 3</th>
//                 <th className="px-4 py-2">Course 4</th>
//                 <th className="px-4 py-2">Course 5</th>
//                 <th className="px-4 py-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredCourses.map(course => (
//                 <tr key={course.id}>
//                   <td className="border px-4 py-2">
//                     <input type="checkbox" />
//                   </td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">{course.name}</td>
//                   <td className="border px-4 py-2">
//                     <button onClick={() => handleApprove(course)} className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-3 rounded mr-2">
//                       Approve
//                     </button>
//                     <button onClick={() => handleModify(course)} className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-1 px-3 rounded">
//                       Modify
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </>
//       )}
//     </div>
//   );
// }

// export default FacultyDashboard;

import React, { useState, useEffect } from "react";

function FacultyDashboard() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCourses, setSelectedCourses] = useState({});

  useEffect(() => {
    const fetchPendingCourses = async () => {
      const response = await fetch("http://localhost:3001/courses/enroll");
      const data = await response.json();
      setCourses(data);
    };
    fetchPendingCourses();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleApprove = (courseId) => {
    console.log("Approving course", courseId);
    // Implement the API call to approve the course
  };

  const handleModify = (courseId) => {
    console.log("Modifying course", courseId);
    // Implement the API call to modify the course
  };

  const handleBulkApprove = () => {
    console.log("Bulk approving courses", selectedCourses);
    // Implement the API call to bulk approve selected courses
  };

  const handleSelectCourse = (event, courseId) => {
    setSelectedCourses({
      ...selectedCourses,
      [courseId]: event.target.checked,
    });
  };

  const filteredCourses = courses.filter((course) =>
    course.course_id.includes(search)
  );

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Course Approval</h1>
      {courses.length === 0 ? (
        <p>No pending courses.</p>
      ) : (
        <>
          <input
            type="text"
            placeholder="Search rno."
            value={search}
            onChange={handleSearchChange}
            className="mb-6 p-2 border rounded"
          />

          <button
            onClick={handleBulkApprove}
            className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
          >
            Bulk Approve
          </button>

          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Select</th>
                <th className="px-4 py-2">Course</th>
                <th className="px-4 py-2">Role Number</th>
                <th className="px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCourses.map((course) => (
                <tr key={course.id}>
                  <td className="border px-4 py-2">
                    <input
                      type="checkbox"
                      onChange={(e) => handleSelectCourse(e, course.id)}
                    />
                  </td>
                  <td className="border px-4 py-2">{course.course_id}</td>
                  <td className="border px-4 py-2">{course.user_id}</td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleApprove(course.id)}
                      className="bg-green-500 hover:bg-green-700 text-white font-medium py-1 px-3 rounded mr-2"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleModify(course.id)}
                      className="bg-yellow-500 hover:bg-yellow-700 text-white font-medium py-1 px-3 rounded"
                    >
                      Modify
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}

export default FacultyDashboard;