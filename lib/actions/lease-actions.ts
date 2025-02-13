"use server";

import { getAccessToken } from "./user-actions";

export async function sendRentRequest(offerId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/${offerId}/request`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się wysłać zapytania o wynajęcie");
  }

  return { success: true };
}

export async function revokeRentRequest(rentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/${rentId}/revoke`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się anulować zapytania o wynajęcie");
  }

  return { success: true };
}

export async function acceptRentAsk(offerId: string, rentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/${offerId}/request/${rentId}/accept`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się zaakceptować zapytania o wynajęcie");
  }

  return { success: true };
}

export async function rejectRentAsk(offerId: string, rentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/${offerId}/request/${rentId}/reject`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się odrzucić zapytania o wynajęcie");
  }

  return { success: true };
}

export async function getUserRequests() {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/request`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się pobrać wynajmów");
  }

  return result.json();
}

export async function getOwnerRequests() {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/request/owner`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się pobrać wynajmów");
  }

  return result.json();
}
