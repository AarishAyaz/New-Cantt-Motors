import { title } from "node:process";
import {z} from "zod";

export const createCarSchema = z.object({
    title: z.string().min(1, "Title is required"),
    brand: z.string().min(1),
    model: z.string().min(1),

    year: z.number().min(1900).max(new Date().getFullYear()),
    price: z.number().positive(),
    mileage: z.number().nonnegative(),
    fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]),
    registrationCity: z.string().min(1),
    registrationNumber: z.string().min(1),

    description: z.string().optional(),
})

export const updateCarSchema = z.object({
    title: z.string().min(1).optional(),
    brand: z.string().optional(),
    model: z.string().optional(),

    year: z.number()
        .min(1900)
        .max(new Date().getFullYear())
        .optional(),

    price: z.number().positive().optional(),
    mileage: z.number().nonnegative().optional(),

    fuelType: z.enum(["PETROL", "DIESEL", "ELECTRIC", "HYBRID"]).optional(),
    transmission: z.enum(["MANUAL", "AUTOMATIC"]).optional(),

    registrationCity: z.string().optional(),
    registrationNumber: z.string().optional(),

    description: z.string().optional(),
});