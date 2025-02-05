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
  cityId: string;
  name: string;
};

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

export type Offer = {
  id: string;
  appUserId: string;
  title: string;
  description: string;
  availableFrom: string;
  rent: number;
  rooms: number;
  floor: number;
  surfaceArea: number;
  address: {
    country: string;
    region: string;
    city: string;
    street: string;
    zipCode: string;
    buildingNumber: string;
    apartmentNumber: string;
  };
  thumbnailId: string;
  offerStatus?: string;
};

export type OfferSearchParameters = {
  city?: string;
  availableTo?: string;
  rentFrom?: number;
  rentTo?: number;
  surfaceAreaFrom?: number;
  surfaceAreaTo?: number;
};
