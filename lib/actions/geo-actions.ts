"use server";

import { City, Country, Region } from "../types/types";
import { fetchWrapper } from "./fetch-wrapper";

export async function getSupportedCountries(): Promise<Country[]> {
  const response = await fetchWrapper<Country[]>("/lease/dictionary/countries", {
    method: "GET",
    headers: {
      lang: "PL",
    },
    errorMessage: "Nie udało się pobrać listy krajów",
  });

  return response;
}

export async function getSupportedRegions(countryCode: string): Promise<Region[]> {
  const response = await fetchWrapper<Region[]>(`/lease/dictionary/countries/${countryCode}/regions`, {
    method: "GET",
    headers: {
      lang: "PL",
    },
    errorMessage: "Nie udało się pobrać listy regionów",
  });

  return response;
}

export async function getSupportedCities(regionId: string): Promise<City[]> {
  const response = await fetchWrapper<City[]>(`/lease/dictionary/regions/${regionId}/cities`, {
    method: "GET",
    headers: {
      lang: "PL",
    },
    errorMessage: "Nie udało się pobrać listy miast",
  });

  return response;
}

export async function getCityNameById(cityId: string): Promise<City> {
  const result = await fetchWrapper<City>(`/lease/dictionary/cities/${cityId}/name`, {
    method: "GET",
    headers: {
      lang: "PL",
    },
    errorMessage: "Nie udało się pobrać miasta",
  });

  return result;
}
