import mongoose from "mongoose";
import job_role_status from "../utils/jobRoleStatus.js";

const jobSchema = new mongoose.Schema({
    company:{
        type: String,
        required: true
    },
    position:{
        type: String,
        required: true
    },
    status:{
        type: String,
        enum: Object.values(job_role_status),
        default:job_role_status.ACTIVE
    },
    location:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
})

export default mongoose.model("Job", jobSchema);