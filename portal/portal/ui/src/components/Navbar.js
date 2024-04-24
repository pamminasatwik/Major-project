import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <nav className="flex items-center justify-between py-6 px-12  bg-indigo-500 text-white">
      <Link to="/" className="text-2xl font-bold">
        Student 360
      </Link>

      <ul className="flex items-center">
        <li className="ml-6">
          <Link to="/about" className="text-sm font-medium hover:underline">
            About
          </Link>
        </li>
        <li className="ml-6">
          <Link to="/contact" className="text-sm font-medium hover:underline">
            Contact
          </Link>
        </li>
        {token !== null ? (
          <>
            <li className="ml-6">
              <Link to="/dashboard" className="text-sm font-medium hover:underline">
                Dashboard
              </Link>
            </li>
            <li className="ml-6">
              <div className="text-sm font-medium hover:underline" onClick={handleLogout}>
                Logout
              </div>
            </li>
          </>
        ) : (
          <>
            <li className="ml-6">
              <Link to="/signup" className="text-sm font-medium hover:underline">
                Sign Up
              </Link>
            </li>
            <li className="ml-6">
              <Link to="/login" className="text-sm font-medium hover:underline">
                Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
