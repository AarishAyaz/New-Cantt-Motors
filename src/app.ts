import express from "express";
import cors from "cors";
import carRoutes from "./modules/car/car.routes";
import {globalErrorHandler} from "./middlewares/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use(globalErrorHandler);

app.get("/",(req,res)=>{
    res.send("API is running")
});

app.use("/api/cars", carRoutes);

export default app;