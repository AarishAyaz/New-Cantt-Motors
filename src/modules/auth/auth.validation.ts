import {z} from 'zod';

export const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters long")
    .max(100),

    email: z
    .string()
    .trim()
    .email("Invalid email address")
    .toLowerCase(),

 phone: z
  .string()
  .regex(/^03\d{9}$/, "Invalid Pakistani phone number"),
  
    password: z
    .string()
    .min(8,"Password must contain at least 8 characters")
    .max(50)
    .regex(/[A-Z]/, "Must contain one uppercase letter")
    .regex(/[a-z]/, "Must contain one lowercase letter")
    .regex(/[0-9]/, "Must contain one number")
    .regex(/[!@#$%^&*]/, "Must contain one special character")
});

export type RegisterInput = z.infer<typeof registerSchema>;