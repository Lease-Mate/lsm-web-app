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

export async function getUserRentRequests() {
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

export async function getOwnerRentRequests() {
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

export async function getUserRents() {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent`, {
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

export async function getOwnerRents() {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/owner`, {
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

export async function getRentPayments(rentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/payment/${rentId}/all`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się pobrać płatności");
  }

  return result.json();
}

export async function getRentById(rentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/rent/${rentId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się pobrać wynajmu");
  }

  return result.json();
}

export async function payForRent(paymentId: string) {
  const accessToken = await getAccessToken();
  const result = await fetch(`${process.env.API_URL}/lease/payment/${paymentId}/pay`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się opłacić wynajmu");
  }

  return result.json();
}
