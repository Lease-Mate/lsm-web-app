"use server";

import { z } from "zod";
import { offerSchema } from "../schemas/offerSchema";
import { OfferRequest, OfferSearchParameters } from "../types";
import { getAccessToken } from "./user-actions";

export default async function createOffer(data: z.infer<typeof offerSchema>) {
  const accessToken = await getAccessToken();
  const createOfferResult = await createOfferRequest(accessToken);
  const addThumbnailResult = await changeThumbnail(accessToken, createOfferResult.id, data.thumbnail);
  const addImagesToOfferResult = await addImagesToOffer(data.images, createOfferResult.id, accessToken);

  const parsedData: OfferRequest = { ...data, thumbnailId: addThumbnailResult.id };

  const editOfferResult = await editOffer(accessToken, createOfferResult.id, parsedData);

  const publishOfferResponse = await publishOffer(accessToken, createOfferResult.id);

  return publishOfferResponse;
}

export async function createOfferRequest(accessToken: string) {
  const result = await fetch(process.env.OFFERS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się utworzyć oferty");
  }

  return result.json();
}

export async function addImagesToOffer(images: File[], offerId: string, accessToken: string) {
  const promises = images.map(async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    const result = await fetch(process.env.FILE_API_URL + `/image/offer/${offerId}/add`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (!result.ok) {
      throw new Error("Nie udało się dodać obrazu");
    }
    return await result.json();
  });

  return Promise.all(promises);
}

export async function changeThumbnail(accessToken: string, offerId: string, file?: File) {
  if (!file) {
    throw new Error("Brak pliku");
  }

  const formData = new FormData();
  formData.append("file", file);

  const result = await fetch(process.env.FILE_API_URL + `/image/offer/${offerId}/add`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });

  if (!result.ok) {
    throw new Error("Nie udało się dodać obrazu");
  }

  return result.json();
}

export async function editOffer(accessToken: string, offerId: string, data: OfferRequest) {
  const result = await fetch(process.env.OFFERS_API_URL + `/${offerId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });

  if (!result.ok) {
    throw new Error("Nie udało się edytować oferty");
  }

  return result.json();
}

export async function publishOffer(accessToken: string, offerId: string) {
  if (!accessToken) {
    throw new Error("Brak dostępu");
  }

  const result = await fetch(process.env.OFFERS_API_URL + `/${offerId}/publish`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!result.ok) {
    throw new Error("Nie udało się opublikować oferty");
  }

  return result.json();
}

export async function getOffersByParameters(params: OfferSearchParameters) {
  const queryParams = new URLSearchParams(params as Record<string, string>).toString();
  const result = await fetch(process.env.OFFERS_API_URL + "/available/search" + `?${new URLSearchParams(queryParams)}`);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać ofert");
  }

  return result.json();
}

export async function getOfferById(offerId: string) {
  const result = await fetch(process.env.API_URL + `/offer/internal/${offerId}`);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać oferty");
  }

  return result.json();
}
