import { Router } from "express";
import { createBookingController, getAllBookingsController, getBookingController, updateBookingController, deleteBookingController} from "./booking.controller";

const router = Router();

router.post("/", createBookingController);
router.get("/", getAllBookingsController);
router.get("/:id", getBookingController);
router.put("/:id", updateBookingController);
router.delete("/:id", deleteBookingController);

export default router;