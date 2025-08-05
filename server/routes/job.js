import express from "express";
import { createJob, deleteJob, getAllJob, getJob, updateJob } from "../controller/job.js";
import { isAdmin, isLoggedIn } from "../middleware/userAuth.js";

const router = express.Router();

router.post('/create', isLoggedIn, isAdmin, createJob);
router.get('/getjob/:id', isLoggedIn, getJob);
router.get('/getalljobs', isLoggedIn, getAllJob);
router.put('/updatejob/:id', isLoggedIn, isAdmin, updateJob);
router.delete('/deletejob/:id', isLoggedIn, isAdmin, deleteJob);

export default router;