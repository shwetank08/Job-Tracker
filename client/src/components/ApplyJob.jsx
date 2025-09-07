import { useEffect, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useAuth } from "../context/authContext";
import { fetchJobDescription } from "../utility/getAllJobs";
import { useParams } from "react-router-dom";
import { submitApplication } from "../utility/getAllApplicaiton";

const ApplyJob = ({ id, isOpen, onClose, refreshJobs }) => {
  const { user } = useAuth();
  const [resumeName, setResumeName] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDesc, setJobDesc] = useState({});

  useEffect(() => {
    const getJobDetails = async () => {
      const res = await fetchJobDescription(
        `http://localhost:5000/api/getjob/${id}`
      );
      setJobDesc(res.showJob);
    };
    getJobDetails();
  }, []);

  const handleSubmit = async () => {
    if (!resumeFile) {
      alert("Please upload a resume before submitting!");
      return;
    }

    const application = new FormData();
    application.append("resume", resumeFile);

    try {
      const res = await submitApplication(
        `http://localhost:5000/api/apply/${id}`,
        application
      );
      console.log("Application submitted:", res);
      refreshJobs?.();
      console.log(refreshJobs);
      onClose();
    } catch (err) {
      console.error("Failed to submit application", err);
    }
  };

  return (
    <>
      {/* Modal */}
      <Dialog open={isOpen} onClose={onClose} className="relative z-50">
        {/* Background overlay */}
        <DialogBackdrop className="fixed inset-0 bg-black/40 transition-opacity duration-300 data-closed:opacity-0" />

        {/* Centered content */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="max-w-lg w-full rounded-2xl bg-white p-6 sm:p-8 shadow-xl transform transition-all duration-300 ease-out data-closed:scale-95 data-closed:opacity-0">
            {/* Title */}
            <DialogTitle className="text-xl font-bold text-center text-gray-900">
              Apply for{" "}
              <span className="text-indigo-600">{jobDesc.position} Role</span>{" "}
              at {jobDesc.company}
            </DialogTitle>

            {/* Fields */}
            <div className="mt-6 space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Name
                </label>
                <input
                  type="text"
                  value={user?.name || ""}
                  disabled
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-900 text-sm"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  value={user?.email || ""}
                  disabled
                  className="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 bg-gray-100 text-gray-900 text-sm"
                />
              </div>

              {/* Resume */}
              <div>
                <label className="block text-sm font-medium text-gray-600">
                  Resume
                </label>
                <div className="mt-1 flex items-center gap-3">
                  <label className="cursor-pointer rounded-lg bg-blue-50 px-4 py-2 text-sm font-medium text-indigo-600 hover:bg-blue-100 border border-blue-200">
                    Upload File
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => {
                        setResumeName(e.target.files[0]?.name || "");
                        setResumeFile(e.target.files[0] || null);
                      }}
                    />
                  </label>
                  {resumeName && (
                    <p className="text-sm text-gray-700 truncate">
                      {resumeName}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-8 flex justify-center gap-4">
              <button
                onClick={() => onClose()}
                className="rounded-lg border border-gray-300 px-5 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  handleSubmit();
                  onClose();
                }}
                className="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white shadow hover:bg-indigo-700 transition"
              >  
                Submit Application
              </button>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
};

export default ApplyJob;
