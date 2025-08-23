const Application = () => {
  const fetchData = async () => {
    try {
      const callApi = await fetch("http://localhost:5000/api/getapplications", {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!callApi) {
        throw new Error(`HTTP error! status: ${callApi.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Top Controls */}
      <div className="flex items-center gap-3 mb-6">
        <div className="flex items-center bg-white border rounded-lg px-3 py-2 shadow-sm w-full max-w-md">
          <input
            type="text"
            placeholder="Search applications..."
            className="ml-2 outline-none w-full text-sm"
          />
        </div>
        <button className="px-4 py-2 border rounded-lg text-sm bg-gray-100 hover:bg-gray-200">
          Filter
        </button>
      </div>

      {/* Job Application Card */}
      <div className="flex flex-col gap-4">
        <div className="bg-white border rounded-2xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Frontend Developer</h1>
              <h2 className="text-sm text-gray-500">React.js</h2>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-600 font-medium">
              In Progress
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Frontend role at XYZ company using React, Tailwind & Next.js
          </p>
        </div>

        <div className="bg-white border rounded-2xl shadow-md p-4 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold">Backend Developer</h1>
              <h2 className="text-sm text-gray-500">Node.js</h2>
            </div>
            <span className="px-3 py-1 text-xs rounded-full bg-green-100 text-green-600 font-medium">
              Interview Scheduled
            </span>
          </div>
          <p className="text-sm text-gray-600">
            Backend API role with MongoDB, Express & Node.js
          </p>
        </div>
      </div>
    </div>
  );
};

export default Application;
