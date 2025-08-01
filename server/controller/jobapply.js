import jobapply from "../model/jobapply"

export const applyJob = async(req,res) => {
    try{
        const jobId = req.params._id;
        const applyNewJob = await jobapply({...req.body, user: req.user._id, job: jobId})
        res.status(201).json({success: true, applyNewJob})
    }catch(err){
        res.status(500).json({message: "server error - apply job", details: err.details});
    }
}
// export const deleteApplication = async(req,res) => {
//     try{

//     }catch(err){

//     }
// }