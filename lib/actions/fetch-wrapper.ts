"use server";

import { getAccessToken, refreshAccessToken, removeAuthTokens } from "./user-actions";

const API_URL = process.env.API_URL || "";

interface FetchOptions extends RequestInit {
  auth?: boolean;
  errorMessage?: string;
  isRefreshRequest?: boolean;
}

export async function fetchWrapper<T>(url: string, options: FetchOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (options.auth && !options.isRefreshRequest) {
    try {
      const accessToken = await getAccessToken();
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`);
      }
    } catch (error) {
      console.warn(error);
      await removeAuthTokens();
      throw new Error("Użytkownik nie zalogowany.");
    }
  }

  let response = await fetch(`${API_URL}${url}`, { ...options, headers });

  if (response.status === 401 && !options.isRefreshRequest) {
    try {
      const newTokens = await refreshAccessToken();
      if (newTokens) {
        headers.set("Authorization", `Bearer ${newTokens.accessToken}`);
        response = await fetch(`${API_URL}${url}`, { headers });
      } else {
        throw new Error("Użytkownik nie zalogowany.");
      }
    } catch (error) {
      console.warn(error);
      await removeAuthTokens();
      throw new Error("Sesja wygasła.");
    }
  }

  const contentLength = response.headers.get("Content-Length");
  // console.log("content length: " + contentLength);
  //const hasBody = contentLength && parseInt(contentLength, 10) > 0;
  const dontHaveBody = contentLength && parseInt(contentLength, 10) === 0;
  let responseResult = null;

  if (!dontHaveBody) {
    responseResult = await response.json();
  }

  if (!response.ok) {
    if (responseResult?.error) {
      throw new Error(responseResult.error);
    }
    throw new Error(options.errorMessage || "Wystąpił błąd.");
  }

  return responseResult ? responseResult : response;
}
