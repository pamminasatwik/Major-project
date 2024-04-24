import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    user_id: "",
    password: "",
    first_name: "",
    last_name: ""
  });

  const handleChange = event => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetch("http://localhost:3001/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...formData })
    })
      .then(res => res.json())
      .then(data => {
        alert(data.message)
        navigate("/login");
      })
      .catch(error => console.error("Login error:", error));
    console.log("Form data:", formData);
  };

  return (
    <form className=" container mx-auto max-w-md bg-white p-6 rounded-lg shadow-md dark:bg-gray-800" onSubmit={handleSubmit}>
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Create an Account</h2>

      <div className="mb-4">
        <label htmlFor="user_id" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Role No.
        </label>
        <input type="text" id="user_id" name="user_id" value={formData.user_id} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
      </div>

      <div className="mb-4">
        <label htmlFor="first_name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          First Name
        </label>
        <input type="text" id="first_name" name="first_name" value={formData.first_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
      </div>

      <div className="mb-4">
        <label htmlFor="last_name" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Last Name
        </label>
        <input type="text" id="last_name" name="last_name" value={formData.last_name} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 dark:text-gray-200 font-medium mb-2">
          Password
        </label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
      </div>

      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded w-full mt-4">
        Sign Up
      </button>
    </form>
  );
}

export default Signup;
