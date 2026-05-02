import {Request, Response} from 'express';
import {createBooking} from "./booking.service";
import {createBookingSchema} from "./booking.validation";

export const createBookingController = async (req: Request, res: Response)=>{
    try {
        const validatedData = createBookingSchema.parse(req.body);

        const booking = await createBooking(validatedData);

        res.status(201).json({
            success: true,
            message:"Booking created",
            data: booking,
        })
    } catch (error: any) {
        res.status(404).json({
            success: false,
            message: error.message || "Booking faiied"
        })
    }
}