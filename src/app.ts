import express from "express";
import cors from "cors";
import carRoutes from "./modules/car/car.routes";
import {globalErrorHandler} from "./middlewares/error.middleware";
import authRoutes from "./modules/auth/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(globalErrorHandler);

app.get("/",(req,res)=>{
    res.send("API is running")
});

app.use("/api/cars", carRoutes);
app.use("/api/auth", authRoutes);
export default app;