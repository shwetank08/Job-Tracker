import { Link } from "react-router-dom";

const Header = () => {
  
  return (
    <div className="bg-white shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
      
        <h1 className="text-2xl font-bold text-indigo-600"><Link to="/">BeeJobs</Link></h1>

        <nav className="flex space-x-6 text-gray-700 font-medium">
          <a href="#" className="hover:text-indigo-600 transition-colors">
            Dashboard
          </a>
          <Link to="/jobs" className="hover:text-indigo-600 transition-colors">
            Jobs
          </Link>
          <Link to="/applications" className="hover:text-indigo-600 transition-colors">
            Application
          </Link>
          <button className="hover:text-red-500 transition-colors">
            Logout
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Header;
