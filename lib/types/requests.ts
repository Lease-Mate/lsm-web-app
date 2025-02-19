import { z } from "zod";
import { loginSchema } from "../schemas/loginSchema";
import { registerSchema } from "../schemas/registerSchema";

export type LoginRequest = z.infer<typeof loginSchema>;
export type RegisterRequest = z.infer<typeof registerSchema>;

export type OfferRequest = {
  title: string;
  description: string;
  availableFrom: Date;
  rent: number;
  address: {
    country: string;
    region: string;
    city: string;
    street: string;
    zipCode: string;
    buildingNumber: string;
    apartmentNumber?: string;
  };
  rooms: number;
  surfaceArea: number;
  floor?: number;
  thumbnailId: string;
};

export type OfferSearchParameters = {
  city?: string;
  availableTo?: string;
  rentFrom?: number;
  rentTo?: number;
  surfaceAreaFrom?: number;
  surfaceAreaTo?: number;
  page?: number;
  size?: number;
};
