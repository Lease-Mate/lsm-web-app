"use server";

import { LoginRequest, RegisterRequest } from "./types";

export async function login(data: LoginRequest) {
  const response = await fetch(process.env.API_URL + "v1/api/user/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function register(data: RegisterRequest) {
  const requestData = { ...data, dob: data.dateOfBirth.toISOString() };
  console.log(JSON.stringify(requestData));
  const response = await fetch(process.env.API_URL + "v1/api/user/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  });
  console.log(response);
  return response.json();
}
