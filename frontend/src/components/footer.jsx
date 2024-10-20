import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-10">
      <div className="container mx-auto flex flex-col items-center justify-between px-4 md:flex-row">
        <div className="text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-lg font-bold text-indigo-400 mb-4">
            Team Horizon
          </h3>
          <ul className="flex flex-col md:flex-row md:space-x-6 space-y-3 md:space-y-0">
            <li className="hover:text-indigo-300 transition-colors duration-200">
              Shrawan
            </li>
            <li className="hover:text-indigo-300 transition-colors duration-200">
              Ayush
            </li>
            <li className="hover:text-indigo-300 transition-colors duration-200">
              Neha
            </li>
            <li className="hover:text-indigo-300 transition-colors duration-200">
              Digant
            </li>
            <li className="hover:text-indigo-300 transition-colors duration-200">
              Arin
            </li>
          </ul>
        </div>

        {/* Center Text for Desktop */}
        <div className="hidden md:block text-center text-gray-400 mb-4 md:mb-0">
          Created and Managed by{" "}
          <span className="text-indigo-400">Team Horizon</span>
        </div>

        {/* Copyright Section */}
        <div className="text-center md:text-right text-gray-400">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Team Horizon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
