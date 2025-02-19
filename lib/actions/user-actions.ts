"use server";

import { format } from "date-fns";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { fetchWrapper } from "./fetch-wrapper";
import { AuthResponse } from "../types/responses";
import { LoginRequest, RegisterRequest } from "../types/requests";
import { User } from "../types/types";

export async function login(data: LoginRequest): Promise<AuthResponse> {
  const loginResult = await fetchWrapper<AuthResponse>("/user/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
    errorMessage: "Nie poprawny email lub hasło.",
    auth: false,
  });

  if (loginResult.accessToken && loginResult.refreshToken) {
    (await cookies()).set("accessToken", loginResult.accessToken, {
      httpOnly: true,
    });
    (await cookies()).set("refreshToken", loginResult.refreshToken, {
      httpOnly: true,
    });
  }

  return loginResult;
}

export async function register(data: RegisterRequest): Promise<AuthResponse> {
  const requestData = { ...data, dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd") };

  const registerResult = await fetchWrapper<AuthResponse>("/user/auth/register", {
    method: "POST",
    body: JSON.stringify(requestData),
    errorMessage: "Rejestracja nie powiodła się.",
    auth: false,
  });

  if (registerResult.accessToken && registerResult.refreshToken) {
    (await cookies()).set("accessToken", registerResult.accessToken, {
      httpOnly: true,
    });
    (await cookies()).set("refreshToken", registerResult.refreshToken, {
      httpOnly: true,
    });
  }

  return registerResult;
}

export async function logout(): Promise<void> {
  const token = (await cookies()).get("accessToken")?.value;
  if (!token) return;

  try {
    await fetchWrapper("/user/auth/logout", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      auth: true,
    });
  } catch (error) {
    console.warn(error);
  }

  await removeAuthTokens();
  redirect("/");
}

export async function getCurrentUser(): Promise<User | null> {
  const accessToken = await getAccessToken();
  let userResult = null;

  if (accessToken) {
    userResult = await fetchWrapper<User>("/user/info", {
      auth: true,
    });
  }

  return userResult;
}

export async function getAccessToken(): Promise<string> {
  const accessToken = (await cookies()).get("accessToken")?.value;

  if (!accessToken) {
    throw new Error("Użytkownik nie zalogowany.");
  }

  return accessToken;
}

export async function removeAuthTokens() {
  (await cookies()).delete("accessToken");
  (await cookies()).delete("refreshToken");
}

export async function refreshAccessToken(): Promise<AuthResponse> {
  const refreshToken = (await cookies()).get("refreshToken")?.value;

  if (!refreshToken) {
    throw new Error("Brak tokenu odświeżającego.");
  }

  try {
    const refreshResponse = await fetchWrapper<AuthResponse>("/user/auth/refresh", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${refreshToken}`,
      },
      auth: false,
      errorMessage: "Nie udało się odświeżyć sesji.",
      isRefreshRequest: true,
    });

    (await cookies()).set("accessToken", refreshResponse.accessToken, {
      httpOnly: true,
    });
    (await cookies()).set("refreshToken", refreshResponse.refreshToken, {
      httpOnly: true,
    });

    return refreshResponse;
  } catch (error) {
    console.warn(error);
    await removeAuthTokens();
    throw new Error("Nie udało się odświeżyć sesji.");
  }
}

export async function getUserById(userId: string): Promise<User> {
  const response = await fetchWrapper<User>(`/user/${userId}/info`, {
    auth: true,
    errorMessage: "Nie znaleziono użytkownika.",
  });

  return response;
}
