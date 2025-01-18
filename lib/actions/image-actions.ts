"use server";

import { arrayBufferToBase64 } from "../utils";

export async function getThumbnailById(thumbnailId: string) {
  const result = await fetch(process.env.API_URL + "/file/image/" + thumbnailId);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać miniaturki");
  }

  const arrayBuffer = await result.arrayBuffer();
  return arrayBufferToBase64(arrayBuffer);
}

export async function getImagesByOfferId(offerId: string) {
  const result = await fetch(process.env.API_URL + "/file/image/offer/" + offerId);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać obrazów");
  }

  const response = await result.json();

  const promises = response.map(async (image) => {
    const imageResult = await fetch(process.env.API_URL + "/file/image/" + image.id);

    if (!imageResult.ok) {
      throw new Error("Nie udało się pobrać obrazu");
    }

    const arrayBuffer = await imageResult.arrayBuffer();
    return { id: image.id, base64: arrayBufferToBase64(arrayBuffer) };
  });

  return Promise.all(promises);
}
