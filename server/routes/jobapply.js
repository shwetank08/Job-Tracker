import express from 'express';
import { isAdmin, isLoggedIn } from '../middleware/userAuth.js';
import { applyJob, deleteApplication } from '../controller/jobapply.js';
import { upload } from '../middleware/multer.middelware.js';

const router = express.Router();

router.post('/apply/:id',isLoggedIn, upload.single('resume') ,applyJob);
router.delete('/delete/:id',isLoggedIn, isAdmin, deleteApplication);

export default router;
