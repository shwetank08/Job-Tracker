import express from 'express';
import { isLoggedIn } from '../middleware/userAuth.js';
import { applyJob, deleteApplication, getAllJobApplication, getApplication } from '../controller/jobapply.js';
import { upload } from '../middleware/multer.middelware.js';

const router = express.Router();

router.post('/apply/:id',isLoggedIn, upload.single('resume') ,applyJob);
router.delete('/deleteapplication/:id',isLoggedIn, deleteApplication);
router.get('/getapplication/:id',isLoggedIn, getApplication);
router.get('/getapplications',isLoggedIn, getAllJobApplication);

export default router;
