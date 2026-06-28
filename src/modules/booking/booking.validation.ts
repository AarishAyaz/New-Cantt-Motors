import { z } from "zod";

export const createBookingSchema = z.object({
  userId: z.number().int().positive(),

  carId: z.number().int().positive(),

  date: z.string().refine(
    (value) => !isNaN(Date.parse(value)),
    {
      message: "Invalid date format",
    }
  ),
});

export const updateBookingSchema = z.object({
  date: z.string().optional(),

  status: z.enum([
    "PENDING",
    "CONFIRMED",
    "CANCELLED",
  ]).optional(),
});