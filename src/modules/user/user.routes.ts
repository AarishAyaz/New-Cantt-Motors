import { Router } from "express";

import {
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
} from "./user.controller";

const router = Router();

router.get("/", getUsersController);

router.get("/:id", getUserController);

router.patch("/:id", updateUserController);

router.delete("/:id", deleteUserController);

export default router;