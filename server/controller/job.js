import mongoose from "mongoose";
import job from "../model/job";
import user from "../model/user";

export const createJob = async(req,res) => {
    try{
        // const {company, position, location, description, status} = req.body();
        const newJob = await job.create({...req.body, user: req.user._id});
        res.status(201).json({success: "true", newJob});
    }catch(err){
        res.status(500),json({error: "server error - job creation", detail: err.details})
    }

}
// export const Job = async(req,res) => {

// }