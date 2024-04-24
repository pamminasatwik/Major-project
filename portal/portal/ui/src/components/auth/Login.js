import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data, status } = await axios.post("http://localhost:3001/auth/login", {
        user_id: username,
        password
      });

      if (status === 200) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("data", JSON.stringify(data));
        navigate("/dashboard");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <form className="container mx-auto max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-gray-800" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800 dark:text-white">Login</h2>
      <div className="mb-4">
        <label htmlFor="username" className="block text-sm font-medium text-gray-700">
          Username
        </label>
        <input type="text" id="username" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={username} onChange={e => setUsername(e.target.value)} />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input type="password" id="password" className="mt-1 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" value={password} onChange={e => setPassword(e.target.value)} />
      </div>

      <div className="flex items-center justify-between">
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
          Login
        </button>

        <Link to="/signup" className="text-sm text-gray-700 hover:text-blue-700">
          Don't have an account? Sign up
        </Link>
      </div>
    </form>
  );
}

export default Login;
