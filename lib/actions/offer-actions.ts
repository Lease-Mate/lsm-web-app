"use server";

import { z } from "zod";
import { offerSchema } from "../schemas/offerSchema";
import { IdResponse } from "../types/responses";
import { fetchWrapper } from "./fetch-wrapper";
import { OfferRequest, OfferSearchParameters } from "../types/requests";
import { Offer } from "../types/types";

export default async function createOffer(data: z.infer<typeof offerSchema>): Promise<Offer> {
  const createOfferResult = await createOfferRequest();

  const addThumbnailResult = await changeThumbnail(createOfferResult.id, data.thumbnail);

  await addImagesToOffer(data.images, createOfferResult.id);

  const parsedData: OfferRequest = { ...data, thumbnailId: addThumbnailResult.id };

  const editOfferResult = await editOffer(createOfferResult.id, parsedData);

  return editOfferResult;
}

export async function createOfferRequest(): Promise<IdResponse> {
  const result = await fetchWrapper<IdResponse>("/lease/offer/create", {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się utworzyć oferty",
  });

  return result;
}

export async function addImagesToOffer(images: File[], offerId: string): Promise<IdResponse[]> {
  const promises = images.map(async (image) => {
    const formData = new FormData();
    formData.append("file", image);

    const result = await fetchWrapper<IdResponse>(`/file/image/offer/${offerId}/add`, {
      method: "POST",
      auth: true,
      body: formData,
      errorMessage: "Nie udało się dodać zdjęcia do oferty",
    });

    return await result;
  });

  return Promise.all(promises);
}

export async function changeThumbnail(offerId: string, file?: File): Promise<IdResponse> {
  if (!file) {
    throw new Error("Brak pliku");
  }

  const formData = new FormData();
  formData.append("file", file);

  const result = await fetchWrapper<IdResponse>(`/file/image/offer/${offerId}/add`, {
    method: "POST",
    auth: true,
    body: formData,
    errorMessage: "Nie udało się dodać zdjęcia do oferty",
  });

  return result;
}

export async function editOffer(offerId: string, data: OfferRequest): Promise<Offer> {
  const result = await fetchWrapper<Offer>(`/lease/offer/${offerId}/update`, {
    method: "PUT",
    auth: true,
    body: JSON.stringify(data),
    errorMessage: "Nie udało się edytować oferty",
  });

  return result;
}

export async function publishOffer(offerId: string): Promise<Offer> {
  const result = await fetchWrapper<Offer>(`/lease/offer/${offerId}/publish`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się opublikować oferty",
  });

  return result;
}

export async function unpublishOffer(offerId: string): Promise<Offer> {
  const result = await fetchWrapper<Offer>(`/lease/offer/${offerId}/unpublish`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się cofnąć publikacji oferty",
  });

  return result;
}

export async function getOffersByParameters(params: OfferSearchParameters): Promise<Offer[]> {
  const queryParams = new URLSearchParams(params as Record<string, string>).toString();
  console.log(queryParams);
  const result = await fetchWrapper<Offer[]>(`/lease/offer/available/search?${new URLSearchParams(queryParams)}`, {
    auth: false,
    errorMessage: "Nie udało się pobrać ofert",
  });

  return result;
}

export async function getOfferById(offerId: string): Promise<Offer> {
  const result = await fetchWrapper<Offer>(`/lease/offer/${offerId}`, {
    auth: false,
    errorMessage: "Nie udało się pobrać oferty",
  });

  return result;
}

export async function getOffersForUser(): Promise<Offer[]> {
  const result = await fetchWrapper<Offer[]>(`/lease/offer/user/search`, {
    auth: true,
    errorMessage: "Nie udało się pobrać ofert",
  });

  return result;
}

export async function deleteOffer(offerId: string): Promise<void> {
  await fetchWrapper<void>(`/lease/offer/${offerId}`, {
    method: "DELETE",
    auth: true,
    errorMessage: "Nie udało się usunąć oferty",
  });
}

export async function payForOffer(offerId: string): Promise<Offer> {
  const result = await fetchWrapper<Offer>(`/lease/offer/${offerId}/pay`, {
    method: "POST",
    auth: true,
    errorMessage: "Nie udało się opłacić oferty",
  });

  return result;
}
