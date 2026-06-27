import {z} from "zod";

export const createBookingSchema = z.object({
    name: z.string().min(1,"Name is required"),
    phone: z.string().min(1, "Valid Phone is required"),
    date: z.string().refine((val)=>!isNaN(Date.parse(val)),{
        message: "Invalid date format",
    }),

    carId: z.number(),
})

export const updateBookingSchema = z.object({
    name: z.string().optional(),
    phone: z.string().optional(),

    date: z.string().optional(),

    status: z.enum(["PENDING", "CONFIRMED", "CANCELLED"]).optional(),
})