import { z } from "zod";

export const captainSignupSchema = z.object({
  firstname: z.string().min(4, "First name must be at least 4 characters long"),
  lastname: z
    .string()
    .min(4, "Last name must be at least 4 characters long")
    .optional(),
  email: z.string().toLowerCase().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  socketId: z.string().nullable().optional(),
  status: z.enum(["active", "inactive"]).default("inactive"),
  vehicleColor: z.string().min(3, "Color must be at least 3 characters long"),
  vehiclePlate: z.string().min(3, "Plate must be at least 3 characters long"),
  vehicleCapacity: z.coerce.number().int("capacity must be a positive number").min(1, "Capacity must be at least 1"),
  vehicleType: z.enum(["car", "motorcycle", "auto"]),
  lat: z.number().nullable().optional(),
  lng: z.number().nullable().optional(),
});

export const captainLoginSchema = captainSignupSchema.pick({
    email: true,
    password: true,
})
