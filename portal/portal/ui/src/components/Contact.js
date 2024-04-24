import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div className="container mx-auto max-w-sm p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-center text-primary-blue">Contact</h2>

      <p className="mb-4">You can reach me at example@example.com.</p>

      <Link to="/" className="bg-primary-blue hover:bg-blue-700 text-white font-medium py-2 px-4 rounded">
        Back to Home
      </Link>
    </div>
  );
}
export default Contact;
