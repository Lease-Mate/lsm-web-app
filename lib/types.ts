import { z } from "zod";
import { loginSchema } from "./schemas/loginSchema";
import { registerSchema } from "./schemas/registerSchema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type User = {
  id: string;
  email: string;
  name: string;
  surname: string;
  dateOfBirth: Date;
};

export type Country = {
  isoCode: string;
  name: string;
};

export type Region = {
  id: string;
  name: string;
};

export type City = {
  id: string;
  name: string;
};
