"use server";

import { arrayBufferToBase64 } from "../utils";

export async function getImageById(imageId: string): Promise<string> {
  const result = await fetch(`${process.env.API_URL}/file/image/${imageId}`);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać miniaturki");
  }

  const arrayBuffer = await result.arrayBuffer();
  return arrayBufferToBase64(arrayBuffer);
}

export async function getImagesByOfferId(offerId: string): Promise<{ id: string; imageResult: string }[]> {
  const result = await fetch(`${process.env.API_URL}/file/image/offer/${offerId}`);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać obrazów");
  }

  const response = await result.json();

  const promises = response.map(async (image: { id: string; order: number }) => {
    const imageResult = await getImageById(image.id);
    return { id: image.id, imageResult };
  });

  return Promise.all(promises);
}
