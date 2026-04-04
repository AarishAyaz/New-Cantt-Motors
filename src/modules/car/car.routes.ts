import { Router } from "express";
import { getCars, getCar, createCarController, updateCarController, deleteCarController } from "./car.controller";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", createCarController);
router.put("/:id", updateCarController);
router.delete("/:id", deleteCarController);

export default router;