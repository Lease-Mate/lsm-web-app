"use server";

import { format } from "date-fns";
import { LoginRequest, RegisterRequest } from "../types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(data: LoginRequest) {
  const response = await fetch(process.env.API_URL + "v1/api/user/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const loginResult = await response.json();
  if (response.ok && loginResult.accessToken) {
    (await cookies()).set("accessToken", loginResult.accessToken, {
      httpOnly: true,
    });
  }
  return loginResult;
}

export async function register(data: RegisterRequest) {
  const requestData = { ...data, dateOfBirth: format(data.dateOfBirth, "yyyy-MM-dd") };
  const response = await fetch(process.env.API_URL + "v1/api/user/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  const registerResult = await response.json();
  if (response.ok && registerResult.accessToken) {
    (await cookies()).set("accessToken", registerResult.accessToken, {
      httpOnly: true,
    });
  }
  return registerResult;
}

export async function logout() {
  const jwt = (await cookies()).get("accessToken");
  if (!jwt) return;
  await fetch(process.env.API_URL + "v1/api/user/auth/logout", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  (await cookies()).delete("accessToken");
  redirect("/");
}

export async function getUserByToken(jwt: string) {
  const response = await fetch(process.env.API_URL + "v1/api/user/info", {
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  return response.json();
}

export async function getCurrentUser() {
  const accessToken = (await cookies()).get("accessToken");

  if (!accessToken) return null;

  const user = await getUserByToken(accessToken.value);

  return user.error ? null : user;
}
