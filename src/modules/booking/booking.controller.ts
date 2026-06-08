import {Request, Response} from 'express';
import {createBooking, getAllBookings, getBookingById, updateBooking, deleteBooking} from "./booking.service";
import {createBookingSchema, updateBookingSchema} from "./booking.validation";

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

export const getAllBookingsController = async (req: Request, res: Response)=>{
    const bookings = await getAllBookings();
    res.json({success: true, data: bookings});
};

export const getBookingController = async (req: Request, res: Response) => {
    try{
        const id = Number(req.params.id);
        const booking = await getBookingById(id);

        res.json({success: true, data:booking})
    }catch (error: any) {
        res.status(404).json({success: false, message: error.message})
    }
};

export const updateBookingController = async (req: Request, res: Response) =>{
    try{
        const id = Number(req.params.id);
        const data = updateBookingSchema.parse(req.body);

        const updated = await updateBooking(id, data);
        
        res.json({success: true, data: updated})
    } catch{
        res.status(400).json({success: false, message: "Update failed!"})
    }
}

export const deleteBookingController = async (req: Request, res: Response) =>{
    try{
        const id = Number(req.params.id);
        await deleteBooking(id);
        res.json({success: true, message: "Booking deleted!"})
    } catch{
        res.status(400).json({success: false, message: "Delete failed!"})
    }
}