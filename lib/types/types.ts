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

export type Rent = {
  id: string;
  ownerId: string;
  offerId: string;
  userId: string;
  requestDate: string;
  status: "REQUESTED" | "ACTIVE" | "REJECTED_REQUEST" | "REVOKED_REQUEST";
  requested: boolean;
};

export type Payment = {
  id: string;
  rentId: string;
  ownerId: string;
  offerId: string;
  userId: string;
  dueDate: string;
  status: "PAID" | "UNPAID";
  paymentDate: string;
};

export type Chat = {
  chatId: string;
  userId: string;
};

export type Message = {
  id: string;
  chatId: string;
  sender: string;
  content: string;
  timestamp: string;
  sessionId: string;
};
