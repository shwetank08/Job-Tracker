import job from "../model/job.js";
import jobapply from "../model/jobapply.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const applyJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const userId = req.user.id;
    console.log("recieved file", req.file);
    
    if (!req.file) {
      return res.status(400).json({ message: "resume is required" });
    }

    const localfilepath = req.file.path

    const resumeUpload = await uploadOnCloudinary(localfilepath);

    if(!resumeUpload){
      return res(400).json({error: "issue with cloudinary"})
    }

    
    const applyNewJob = await jobapply.create({
      user: userId,
      job: jobId,
      resume: resumeUpload.secure_url,
    });
    res.status(201).json({ success: true, applyNewJob });
  } catch (err) {
    res
      .status(500)
      .json({ message: "server error - apply job", details: err.message });
  }
};
export const deleteApplication = async(req,res) => {
    try{
      const jobId = req.params.id;
      
      const deletedApplication = await job.findByIdAndDelete(jobId);

      if(!deletedApplication){
        return res.status(404).json({message: "job application not found"});
      }

      res.status(200).json({message: "job deleted", deletedApplication});
    }catch(err){
      res.status(400).json({message: "issue with delete job application", error: err.message})
    }
}
