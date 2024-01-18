import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import taskRoutes from "./routes/taskRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/task", taskRoutes);
app.use("/api/v1/user", userRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server Listning on port ${PORT}`);
});
