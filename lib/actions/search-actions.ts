"use server";

import { z } from "zod";
import { searchCardSchema } from "../schemas/searchCardSchema";
import { flattenObject } from "../utils";

export async function getSupportedCountries() {
  const response = await fetch(process.env.OFFERS_API_URL + "v1/api/offer/dictionary/countries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function getSupportedRegions(countryCode: string) {
  const response = await fetch(
    process.env.OFFERS_API_URL + `v1/api/offer/dictionary/countries/${countryCode}/regions`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        lang: "PL",
      },
    }
  );

  return response.json();
}

export async function getSupportedCities(regionId: string) {
  const response = await fetch(process.env.OFFERS_API_URL + `v1/api/offer/dictionary/regions/${regionId}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function searchOffers(values: Partial<z.infer<typeof searchCardSchema>>) {
  delete values.region;
  delete values.country;
  console.log(values);
  const flattenedValues = flattenObject(values);
  const queryParams = new URLSearchParams(flattenedValues as Record<string, string>).toString();
  console.log(queryParams);
  const response = await fetch(process.env.OFFERS_API_URL + "v1/api/offer/available/search?" + queryParams, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}
