import express from "express";
import cors from "cors";
import todoRoutes from "./routes/todoRoutes.js";
import bikeRoutes from "./routes/bikeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", todoRoutes);
app.use("/api", bikeRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
export default app;
