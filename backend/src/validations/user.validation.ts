import zod from "zod";

export const userSignupSchema = zod.object({
  firstname: zod.string().min(4, "First name is required"),
  lastname: zod.string().min(4, "Last name is required").optional(),
  email: zod.string().toLowerCase().email("username must be an email"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
  socketId: zod.string().nullable().optional(),
});

export const loginSchema = zod.object({
  email: zod
    .string()
    .toLowerCase()
    .email("username must be an email"),
  password: zod.string().min(6, "Password must be at least 6 characters long"),
});
