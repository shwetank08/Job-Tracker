import express from "express";
import { createJob } from "../controller/job.js";
import { isLoggedIn } from "../middleware/userAuth.js";

const router = express.Router();

router.post('/create', isLoggedIn, createJob);

export default router;