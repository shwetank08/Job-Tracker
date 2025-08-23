import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchApplication } from "../utility/getAllApplicaiton";


const Body = () => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const [jobStatus, setJobStatus] = useState({});
  const [jobsApplied, setJobsApplied] = useState({});
  const [dataLineChart, setDataLineChart] = useState(
    months.map(m => ({ month: m, applications: 0 }))
  );

  useEffect(() => {
    const loadApplication = async() => {
    const data = await fetchApplication("http://localhost:5000/api/getapplications");
    console.log(data);
    
    setJobsApplied(data.jobApplications || []);
    setDataLineChart(buildChartData(data.jobApplications || []))
    setJobStatus(getStatusCount(data.jobApplications || []))
    }
    loadApplication();
  }, []);

  const buildChartData = (jobsApplied) => {
    const originalData = months.map(m=>({month: m, application: 0}));
    jobsApplied.forEach(job=>{
      const monthIndex = new Date(job.appliedAt).getMonth();
      originalData[monthIndex].application+=1;
    });
    
    return originalData;
  }

  const getStatusCount = (jobs) => {
    return jobs.reduce((acc,cur)=>{
      acc[cur.status] = (acc[cur.status] || 0) + 1;
      return acc;
    },{});
  };


  


  return (
    <div className="flex justify-center items-center flex-col gap-2 mt-2">
      <div>
        <h1>Hi User👋</h1>
      </div>
      {console.log(dataLineChart)}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
         <Link to="/applications">
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4 hover:bg-[#6366f1] hover:text-shadow-white transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
          <span className="text-2xl font-bold">{jobsApplied.length}</span>
          <span className="text-gray-500 text-sm">Total Jobs</span>
        </div>
        </Link>
         <Link to="/applications">
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">
            {jobStatus.INTERVIEWED || 0}
          </span>
          <span className="text-gray-500 text-sm">Interviews</span>
        </div>
        </Link>
         <Link to="/applications">
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">{jobStatus.OFFER || 0}</span>
          <span className="text-gray-500 text-sm">Offers</span>
        </div>
        </Link>
        <Link to="/applications">
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">
            {jobStatus.REJECTED || 0}
          </span>
          <span className="text-gray-500 text-sm">Rejection</span>
        </div>
        </Link>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4">
        <div className="bg-white shadow rounded-lg p-2 sm:p-4 h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataLineChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="month"
                interval={0}
                scale="point"
                padding={{ left: 20, right: 20 }}
              />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="application"
                stroke="#6366f1"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Body;
