"use server";

export async function getThumbnailById(thumbnailId: string) {
  const result = await fetch(process.env.API_URL + "/file/image/" + thumbnailId);

  if (!result.ok) {
    throw new Error("Nie udało się pobrać miniaturki");
  }

  return result.arrayBuffer();
}
