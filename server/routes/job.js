import express from "express";
import { createJob } from "../controller/job.js";
import { isAdmin, isLoggedIn } from "../middleware/userAuth.js";

const router = express.Router();

router.post('/create', isLoggedIn, isAdmin, createJob);

export default router;