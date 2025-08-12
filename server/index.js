import express from "express";
import connect from "./config/database.js";
import dotenv from "dotenv";
import cors from "cors"

import userRoutes from './routes/user.js';
import jobRoutes from './routes/job.js';
import cookieParser from "cookie-parser";
import jobapply from "./routes/jobapply.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}))

app.use('/api',userRoutes);
app.use('/api',jobRoutes);
app.use('/api',jobapply);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server running on http://localhost:${PORT}`);
});
