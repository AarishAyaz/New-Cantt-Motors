import { Router } from "express";
import { getCars, getCar, createCatController } from "./car.controller";

const router = Router();

router.get("/", getCars);
router.get("/:id", getCar);
router.post("/", createCatController);

export default router;