import { useEffect, useMemo, useState } from "react";
import { fetchApplication } from "../utility/getAllApplicaiton";
import { fetchJobDescription } from "../utility/getAllJobs";
import ToggleText from "../utility/ToggleText";

import { Filter, Search } from "lucide-react";

const Application = () => {
  const [application, setApplication] = useState([{}]);
  const [jobDetails, setJobDetails] = useState([{}]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const loadApplication = async () => {
      const data = await fetchApplication(
        "http://localhost:5000/api/getapplications"
      );
      console.log(data);
      setApplication(data.jobApplications);
    };

    const loadJobDescription = async () => {
      const description = await fetchJobDescription(
        "http://localhost:5000/api/getalljobs"
      );
      setJobDetails(description.showAllJob);
    };

    loadApplication();
    loadJobDescription();
  }, []);

  const JobMap = useMemo(() => {
    const map = {};
    jobDetails.forEach((job) => {
      map[job._id] = job;
    });
    return map;
  }, [jobDetails]);

  const appliedJobs = application.map((app) => ({
    ...app,
    jobList: JobMap[app.job],
  }));

  console.log(appliedJobs);

  const handleSearch = () => {
    
  }

  return (
    <div className="p-6 max-w-5xl mx-auto flex justify-center items-center flex-col">
      
      {/* Top Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm w-full max-w-md">
          <input
            type="text"
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            placeholder="Search applications..."
            className="ml-2 outline-none w-full text-sm"
          />
        </div>
        <button className="px-4 py-2" onClick={()=>handleSearch(query)}>
          <Search className="w-6 h-6 text-indigo-600 transform transition-transform duration-300 hover:scale-105 cursor-pointer" />
        </button>
        <button className="px-4 py-2" onClick={handleFilter}>
          <Filter className="w-6 h-6 text-indigo-600 transform transition-transform duration-300 hover:scale-105 cursor-pointer" />
        </button>
      </div>

      {/* Job Application Cards */}
      {console.log(appliedJobs)}
      {appliedJobs.length > 0 ? (
        appliedJobs.map((element) => (
          <div className="flex flex-col gap-4" key={element._id}>
            <div
              className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 
                      hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">
                    {element.jobList?.company}
                  </h1>
                  <h2 className="text-sm text-gray-500">
                    {element.jobList?.position}
                  </h2>
                </div>
                <span className="px-3 py-1 text-xs rounded-full bg-indigo-100 text-indigo-600 font-medium">
                  {element.status}
                </span>
              </div>

              <ToggleText text={element.jobList?.description} maxLength={150} />

              <p className="text-xs text-gray-400">
                Applied on {new Date(element.appliedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No applications found.</p>
      )}
    </div>
  );
};

export default Application;
