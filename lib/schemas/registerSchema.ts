"use client";

import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().email({ message: "Nieprawidłowy adres email" }),
  password: z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
  confirmPassword: z.string().min(8, { message: "Hasło musi mieć co najmniej 8 znaków" }),
  name: z.string().min(1, { message: "Imię jest wymagane" }),
  surname: z.string().min(1, { message: "Nazwisko jest wymagane" }),
  dateOfBirth: z.date(),
});
