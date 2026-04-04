import { title } from "node:process";
import {z} from "zod";

export const createCarSchema = z.object({
    title: z.string().min(1, "Title is required"),
    price: z.number().positive("Price must be a positive number"),
    year: z.number().min(1900).max(new Date().getFullYear()),
})