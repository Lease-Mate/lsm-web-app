"use server";

import { z } from "zod";
import { searchCardSchema } from "../schemas/searchCardSchema";
import { flattenObject } from "../utils";

export async function getSupportedCountries() {
  const response = await fetch(process.env.OFFERS_API_URL + "/dictionary/countries", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function getSupportedRegions(countryCode: string) {
  const response = await fetch(process.env.OFFERS_API_URL + `/dictionary/countries/${countryCode}/regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function getSupportedCities(regionId: string) {
  const response = await fetch(process.env.OFFERS_API_URL + `/dictionary/regions/${regionId}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}
