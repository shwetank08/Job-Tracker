import ToggleText from "../utility/ToggleText";

const JobCard = ({ Jobs }) => {
  const getStatusColor = (status) => {
    console.log(status);
    
    switch (status) {
      case "OFFER":
        return "bg-green-100 text-green-700";
      case "REJECTED":
        return "bg-red-100 text-red-700";
      case "INTERVIEWED":
        return "bg-purple-100 text-purple-700";
      case "APPLIED":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {Jobs && Jobs.length > 0 ? (
        Jobs.map((currentJob) => (
          <div
            key={currentJob._id}
            className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-3 
                       hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer"
          >
            <div className="flex items-start justify-between">
              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  {currentJob.jobList?.company}
                </h1>
                <h2 className="text-sm text-gray-500">
                  {currentJob.jobList?.position}
                </h2>
              </div>
              <span
                className={`px-3 py-1 text-xs rounded-full font-medium
                ${getStatusColor(currentJob.status)}`}
              >
                {currentJob.status}
              </span>
            </div>

            <ToggleText
              text={currentJob.jobList?.description}
              maxLength={150}
            />

            <p className="text-xs text-gray-400">
              Applied on {new Date(currentJob.appliedAt).toLocaleDateString()}
            </p>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-sm">No applications found.</p>
      )}
    </div>
  );
};

export default JobCard;
