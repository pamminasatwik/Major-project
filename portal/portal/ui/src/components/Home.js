import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/Bg_home.webp";

function Home() {
  return (
    <div className="max-h-full max-w-full" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundRepeat: "no-repeat", height: "70vh" }}>
      <h2 className="text-2xl font-semibold mb-4 text-center text-white">Welcome to my website</h2>
      <p className="mb-4 darkMode text-white">This is a simple website that demonstrates how to use React Router DOM.</p>
      <Link to="/about" className="bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounde">
        About
      </Link>

      <Link to="/contact" className="bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
        Contact
      </Link>
    </div>
  );
}

export default Home;
