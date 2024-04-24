import React from "react";
import { Link } from "react-router-dom";

function About() {
  return (
    <div className="container mx-auto max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary-blue">About</h2>

      <p className="mb-4">This website is a demonstration of how to use React Router DOM.</p>

      <Link to="/" className="bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
        Back to Home
      </Link>
    </div>
  );
}
export default About;
