import express from "express";
import connect from "./config/database.js";
import dotenv from "dotenv";
import userRoutes from './routes/user.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use('/api',userRoutes);

app.get("/", (req, res) => {
  res.send("API is running...");
});

app.listen(PORT, async () => {
  await connect();
  console.log(`Server running on http://localhost:${PORT}`);
});
