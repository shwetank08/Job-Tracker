import mongoose from "mongoose";
import job_status from "../utils/jobStatus";

const jobapply = new mongoose.model({
  user: {
    type: new mongoose.Schema.Types.ObjectId(),
    ref: "User",
    required: true,
  },
  job: {
    type: new mongoose.Schema.Types.ObjectId(),
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
    type: Date(),
    default: Date.now()
  }
});
