import { z } from "zod";
import { loginSchema } from "./schemas/loginSchema";
import { registerSchema } from "./schemas/registerSchema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;
