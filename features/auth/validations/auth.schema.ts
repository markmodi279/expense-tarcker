import { z } from "zod";

// SIGNUP SCHEMA
export const signupSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Name must be at least 2 characters")
        .max(50, "Name must be less than 50 characters"),

    email: z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password is too long"),
});

// LOGIN SCHEMA
export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .email("Please enter a valid email address")
        .toLowerCase(),

    password: z
        .string()
        .min(1, "Password is required"),
});

// INFERRED TYPES
export type SignupFormData = z.infer<
    typeof signupSchema
>;

export type LoginFormData = z.infer<
    typeof loginSchema
>;