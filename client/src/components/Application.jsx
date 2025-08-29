import { useEffect, useMemo, useState } from "react";
import { fetchApplication } from "../utility/getAllApplicaiton";
import { fetchJobDescription } from "../utility/getAllJobs";

import { Filter, Search } from "lucide-react";
import JobCard from "../helper/JobCard";

const FILTER_OPTIONS = ["APPLY", "APPLIED", "INTERVIEWED", "OFFER", "REJECTED"];

const Application = () => {
  const [application, setApplication] = useState([{}]);
  const [jobDetails, setJobDetails] = useState([{}]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const loadData = async () => {
      try {
        const apps = await fetchApplication(
          "http://localhost:5000/api/getapplications"
        );
        setApplication(apps.jobApplications);

        const jobs = await fetchJobDescription(
          "http://localhost:5000/api/getalljobs"
        );
        setJobDetails(jobs.showAllJob);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };
    loadData();
  }, []);

  const JobMap = useMemo(() => {
    const map = {};
    jobDetails.forEach((job) => {
      map[job._id] = job;
    });
    return map;
  }, [jobDetails]);

  const appliedJobs = useMemo(() => {
    return application.map((app) => ({
      ...app,
      jobList: JobMap[app.job],
    }));
  }, [application, JobMap]);

  const handleFilterApplication = useMemo(() => {
    return appliedJobs.filter((app) => {
      const job = app.jobList;
      if (!job) return false;
      if (filter && app.status !== filter) return false;
      const query = search.toLowerCase();
      return (
        job?.company?.toLowerCase().includes(query) ||
        job?.position?.toLowerCase().includes(query) ||
        job?.description?.toLowerCase().includes(query) ||
        job?.position?.toLowerCase().includes(query)
      );
    });
  }, [appliedJobs, search, filter]);

  return (
    <div className="p-6 max-w-5xl mx-auto flex justify-center items-center flex-col">
      {/* Top Controls */}
      <div className="flex items-center gap-4 mb-6 w-full max-w-3xl">
        {/* Search Box */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search applications..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          />
        </div>

        {/* Filter Dropdown */}
        <div className="relative">
          <Filter className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-4 py-2 border rounded-lg text-sm shadow-sm focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="">All</option>
            {FILTER_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Job Application Cards */}
      {console.log(appliedJobs)}
      <JobCard Jobs={handleFilterApplication} />
    </div>
  );
};

export default Application;
