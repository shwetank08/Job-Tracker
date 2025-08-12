import React from "react";

const Header = () => {
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      
        <h1 className="text-2xl font-bold text-indigo-600">BeeJobs</h1>

        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Dashboard
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Jobs
          </a>
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Application
          </a>
          <button className="hover:text-red-500 transition-colors">
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
