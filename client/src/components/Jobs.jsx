import { useEffect, useState } from "react";
import { fetchJobDescription } from "../utility/getAllJobs";
import ToggleText from "../utility/ToggleText";
import { useNavigate } from "react-router-dom";
import ApplyJob from "./ApplyJob";

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [jobId, setJobId] = useState("");

  const navigate = useNavigate();

  const fetchAllJobs = async () => {
      const fetchJobs = await fetchJobDescription(
        "http://localhost:5000/api/getalljobs"
      );
      console.log("show ALL jobs --",fetchJobs.showAllJob);
      setJobs(fetchJobs.showAllJob);
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const handleApply = (id) => {
    console.log(id);
    setJobId(id);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen px-4 sm:px-6 py-8 flex flex-col items-center">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-600 mb-6 sm:mb-8 text-center">
        Explore Jobs
      </h1>
      {/* Diaglog box rendering */}
      {isOpen && (
        <ApplyJob id={jobId} isOpen={isOpen} onClose={() => setIsOpen(false)} refreshJobs={fetchAllJobs}/>
      )}
      <div className="w-full max-w-4xl space-y-6">
        {jobs.length === 0 ? (
          <div className="text-center text-white text-lg">
            No openings at the moment - check back soon!
          </div>
        ) : (
          jobs.map((job, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 flex flex-col sm:flex-row sm:items-center justify-between"
            >
              {/* Left Side*/}
              <div className="flex flex-col space-y-2">
                <span className="text-lg font-semibold text-gray-900">
                  {job.position || "Job Position"}
                </span>
                <span className="text-sm text-gray-600">
                  {job.company || "Company"} • {job.location}
                </span>
                <ToggleText text={job?.description} maxLength={150} />
              </div>

              {/* Right Side*/}
              <div className="mt-4 sm:mt-0 flex flex-col items-end space-y-2">
                <span
                  className={`px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-600`}
                >
                  {job.applicationStatus? job.applicationStatus:job.status}
                </span>
                {job.applicationStatus === "ACTIVE" ? (
                  <button
                    className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out"
                    onClick={() => handleApply(job._id)}
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white text-sm px-4 py-2 rounded-lg shadow-md cursor-not-allowed opacity-70"
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Jobs;
