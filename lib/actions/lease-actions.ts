"use server";

import { Payment, Rent } from "../types/types";
import { fetchWrapper } from "./fetch-wrapper";

export async function sendRentRequest(offerId: string): Promise<void> {
  await fetchWrapper(`/lease/rent/${offerId}/request`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się wysłać zapytania o wynajęcie",
  });
}

export async function revokeRentRequest(rentId: string): Promise<void> {
  await fetchWrapper(`/lease/rent/${rentId}/revoke`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się anulować zapytania o wynajęcie",
  });
}

export async function acceptRentAsk(offerId: string, rentId: string): Promise<void> {
  await fetchWrapper(`/lease/rent/${offerId}/request/${rentId}/accept`, {
    method: "PUT",
    auth: true,
    errorMessage: "Nie udało się zaakceptować zapytania o wynajęcie",
  });
}

export async function rejectRentAsk(offerId: string, rentId: string): Promise<void> {
  await fetchWrapper(`${process.env.API_URL}/lease/rent/${offerId}/request/${rentId}/reject`, {
    method: "PUT",
    auth: true,
    errorMessage: "Nie udało się odrzucić zapytania o wynajęcie",
  });
}

export async function getUserRentRequests(): Promise<Rent[]> {
  const result = await fetchWrapper<Rent[]>("/lease/rent/request", {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać zapytań o wynajem",
  });

  return result;
}

export async function getOwnerRentRequests(): Promise<Rent[]> {
  const result = await fetchWrapper<Rent[]>("/lease/rent/request/owner", {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać zapytań o wynajem",
  });

  return result;
}

export async function getUserRents(): Promise<Rent[]> {
  const result = await fetchWrapper<Rent[]>("/lease/rent", {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać wynajmów",
  });

  return result;
}

export async function getOwnerRents(): Promise<Rent[]> {
  const result = await fetchWrapper<Rent[]>("/lease/rent/owner", {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać wynajmów",
  });

  return result;
}

export async function getRentById(rentId: string): Promise<Rent> {
  const result = await fetchWrapper<Rent>(`/lease/rent/${rentId}`, {
    method: "GET",
    auth: true,
    errorMessage: "Nie udało się pobrać wynajmu",
  });

  return result;
}

export async function getRentPayments(rentId: string): Promise<Payment[]> {
  const result = await fetchWrapper<Payment[]>(`/lease/payment/${rentId}/all`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się pobrać płatności",
  });

  return result;
}

export async function payForRent(paymentId: string): Promise<Payment> {
  const result = await fetchWrapper<Payment>(`/lease/payment/${paymentId}/pay`, {
    method: "POST",
    auth: true,
  });

  return result;
}
