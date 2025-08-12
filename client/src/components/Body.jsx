import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Body = () => {

  const [jobsApplied, setJobsApplied] = useState({});

  const fetchData = async() => {
    try{
      const callApi = await fetch("http://localhost:5000/api/getapplications",{
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      })
      if(!callApi){
        throw new Error(`HTTP error! status: ${callApi.status}`)
      }

      const data = await callApi.json();
      setJobsApplied(data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    fetchData();
  },[]);

  const data = [
    { month: "Jan", applications: 12 },
    { month: "Feb", applications: 18 },
    { month: "Mar", applications: 9 },
    { month: "Apr", applications: 15 },
    { month: "May", applications: 20 },
  ];
  
  return (
    <div className="flex justify-center items-center flex-col gap-2 mt-2">
      <div>
        <h1>Hi User👋</h1>
      </div>
      {console.log(jobsApplied)}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 p-4">
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4 hover:bg-[#6366f1] hover:text-shadow-white transition-all duration-300 ease-in-out transform hover:scale-105 cursor-pointer">
          <span className="text-2xl font-bold">25</span>
          <span className="text-gray-500 text-sm">Total Jobs</span>
        </div>
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">10</span>
          <span className="text-gray-500 text-sm">Interviews</span>
        </div>
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">2</span>
          <span className="text-gray-500 text-sm">Offers</span>
        </div>
        <div className="aspect-square flex flex-col items-center justify-center bg-white shadow rounded-lg border-2 border-black p-2 sm:p-4">
          <span className="text-2xl font-bold">8</span>
          <span className="text-gray-500 text-sm">Rejection</span>
        </div>
      </div>
      <div className="w-full max-w-[1200px] mx-auto px-2 sm:px-4">
        <div className="bg-white shadow rounded-lg p-2 sm:p-4 h-64 sm:h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
            >
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
                dataKey="applications"
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
