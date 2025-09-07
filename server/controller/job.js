import mongoose from "mongoose";
import job from "../model/job.js";
import user from "../model/user.js";
import { ObjectId } from "mongodb"

export const createJob = async (req, res) => {
  try {
    // const {company, position, location, description, status} = req.body();
    console.log("req.user:", req.user);
    const newJob = await job.create({ ...req.body, user: req.user._id });
    res.status(201).json({ success: "true", newJob });
  } catch (err) {
    res
      .status(500)
      .json({ error: "server error - job creation", detail: err.details });
  }
};

export const deleteJob = async (req, res) => {
  try {
    const getJobId = req.params.id;
    const deleteJob = await job.findByIdAndDelete(getJobId);
    res.status(201).json({ message: "Job Deleted Successfully", deleteJob });
  } catch (err) {
    res
      .status(500)
      .json({ error: "server error - job deletion", detail: err.detail });
  }
};

export const getAllJob = async (req, res) => {
  try {
    const showAllJob = await job.aggregate([
      {
        $lookup: {
          from: "applyjobs", // collection name of ApplyJob
          let: { jobId: "$_id" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$job", "$$jobId"] },
                    { $eq: ["$user", req.user._id] }
                  ]
                }
              }
            }
          ],
          as: "userApplications"
        }
      },
      {
        $addFields: {
          applicationStatus: {
            $cond: [
              { $gt: [{ $size: "$userApplications" }, 0] },
              { $arrayElemAt: ["$userApplications.status", 0] },
              "$status" // fallback to job status (ACTIVE/INACTIVE)
            ]
          }
        }
      },
      {
        $project: {
          userApplications: 0 // don’t expose full applications
        }
      }
    ]);

    if (!showAllJob) {
      return res.status(400).json({ message: "no job exists" });
    }
    res.status(200).json({
      success: "true",
      showAllJob,
    });
  } catch (err) {
    console.log("error in getalljob", err);
    
    res
      .status(500)
      .json({ error: "server error - get all job ", detail: err.detail });
  }
};

export const getJob = async (req, res) => {
  try {
    const jobId = req.params.id;
    const showJob = await job.findById(jobId);
    if (!showJob) {
      return res.status(400).json({ message: "job does not exists" });
    }
    res.status(200).json({
      success: "true",
      showJob,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "server error - get job", detail: err.detail });
  }
};

export const updateJob = async(req,res) => {
  try{
    const getJobId = req.params.id;
    const updateTheJob = await job.findByIdAndUpdate(getJobId, req.body, {
      new: true,
      runValidators: true
    } );
    if(!updateJob){
      return res.status(400).json({message: "Job not found"});
    }

    return res.status(200).json({
      message: "Job updated successfully",
      job: updateTheJob
    })
  }catch(err){
    return res.status(400).json({message: "error in updating job", details: err.message});
  }
}
