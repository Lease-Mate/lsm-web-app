"use client";

import { z } from "zod";

export const offerSchema = z.object({
  title: z.string().min(1, "Tytuł jest wymagany"),
  description: z.string().min(1, "Opis jest wymagany"),
  availableFrom: z.date().min(new Date(), "Data dostępności musi być w przyszłości"),
  rent: z.coerce.number().min(1, "Cena jest wymagana"),
  address: z.object({
    country: z.string().min(1, "Kraj jest wymagany"),
    region: z.string().min(1, "Województwo jest wymagane"),
    city: z.string().min(1, "Miasto jest wymagane"),
    street: z.string().min(1, "Ulica jest wymagana"),
    zipCode: z
      .string()
      .min(1, "Kod pocztowy jest wymagany")
      .regex(/^\d{2}-\d{3}$/, "Niepoprawny kod pocztowy"),
    buildingNumber: z.string().min(1, "Numer budynku jest wymagany"),
    apartmentNumber: z.string().optional(),
  }),
  rooms: z.coerce.number().int().min(1, "Liczba pokoi jest wymagana"),
  surfaceArea: z.coerce.number().int().min(1, "Powierzchnia jest wymagana"),
  floor: z.coerce.number().int().optional(),
  thumbnail: z.custom<File>((file) => file instanceof File, "Musisz przesłac plik obrazu"),
});
