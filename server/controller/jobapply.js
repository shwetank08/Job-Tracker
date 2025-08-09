import jobapply from "../model/jobapply.js";
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    console.log("recieved file", req.file);

    if (!req.file) {
      return res.status(400).json({ message: "resume is required" });
    }

    const localfilepath = req.file.path;
    let resumeUpload
    try {
      resumeUpload = await uploadOnCloudinary(localfilepath);
      console.log("resume upload", resumeUpload);

      if (!resumeUpload || !resumeUpload.secure_url) {
        return res.status(400).json({
          message: "Failed to upload resume to Cloudinary",
        });
      }

    } catch (error) {
      return res.status(400).json({
        message: "Upload failed",
        details: error.message || "Unknown error while uploading",
      });
    }

    const applyNewJob = await jobapply.create({
      user: userId,
      job: jobId,
      resume: resumeUpload.secure_url,
      public_id: resumeUpload.public_id
    });
    res.status(201).json({ success: true, applyNewJob });
  } catch (err) {
    res
      .status(400)
      .json({ message: "server error - apply job", details: err.message });
  }
};
export const deleteApplication = async (req, res) => {
  try {
    const jobId = req.params.id;

    const getJob = await jobapply.findById(jobId);

    if(!getJob){
      return res.status(400).json({message: "job not found"});
    }

    if(getJob.public_id){      
      await deleteFromCloudinary(getJob.public_id);
    }

    const deletedApplication = await jobapply.findByIdAndDelete(jobId);

    if (!deletedApplication) {
      return res.status(404).json({ message: "job application not found" });
    }

    res
      .status(200)
      .json({ message: "job application deleted", deletedApplication });
  } catch (err) {
    res.status(400).json({
      message: "issue with delete job application",
      error: err.message,
    });
  }
};
export const getApplication = async (req, res) => {
  try {
    const jobId = req.params.id;

    const jobApplication = await jobapply.findById(jobId);

    if (!jobApplication) {
      return res.status(404).json({ message: "job application not found" });
    }

    res.status(200).json({ message: "job application found", jobApplication });
  } catch (err) {
    res.status(400).json({
      message: "issue with finding job application",
      error: err.message,
    });
  }
};
export const getAllJobApplication = async (req, res) => {
  try {
    const jobApplications = await jobapply.find();

    if (!jobApplications) {
      return res.status(404).json({ message: "job applications not found" });
    }

    res
      .status(200)
      .json({ message: "job applications found", jobApplications });
  } catch (err) {
    res.status(400).json({
      message: "issue with delete job application",
      error: err.message,
    });
  }
};
