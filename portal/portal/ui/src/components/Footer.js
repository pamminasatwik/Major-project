import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 px-4">
      <div className="container mx-auto">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/4 text-center md:text-left">
            <h5 className="uppercase mb-6 font-bold">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <Link to="/" className="hover:underline text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/about" className="hover:underline text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li className="mt-2">
                <Link to="/contact" className="hover:underline text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/4 text-center md:text-right mt-6 md:mt-0">
            <p className="uppercase text-gray-400 text-xs leading-none mb-2">Copyright &copy; 2024 CMRCET</p>
            <p className="text-gray-400 text-xs leading-none">All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
