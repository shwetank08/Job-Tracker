import mongoose from "mongoose";
import job_status from "../utils/jobStatus";

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
        enum: Object.values(job_status),
        default:job_status.APPLY
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