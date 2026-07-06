import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(2).optional(),

  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, "Invalid phone number")
    .optional(),

  role: z.enum(["ADMIN", "USER"]).optional(),

  isActive: z.boolean().optional(),
});