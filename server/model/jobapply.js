import mongoose, { model } from "mongoose";
import job_status from "../utils/jobStatus.js";

const jobapply = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true,
  },
  resume: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: Object.values(job_status),
    default: job_status.APPLIED
  },
  appliedAt: {
    type: Date,
    default: Date.now()
  }
});

export default mongoose.model("ApplyJob", jobapply); 