"use server";

export async function getSupportedCountries() {
  const response = await fetch(`${process.env.API_URL}/offer/dictionary/countries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function getSupportedRegions(countryCode: string) {
  const response = await fetch(`${process.env.API_URL}/offer/dictionary/countries/${countryCode}/regions`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}

export async function getSupportedCities(regionId: string) {
  const response = await fetch(`${process.env.API_URL}/offer/dictionary/regions/${regionId}/cities`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      lang: "PL",
    },
  });

  return response.json();
}
