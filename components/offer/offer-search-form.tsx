"use client";

import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { getSupportedCities, getSupportedCountries, getSupportedRegions } from "@/lib/actions/search-actions";
import { City, Country, Region } from "@/lib/types";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn, parseLocalDateString } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { useRouter, useSearchParams } from "next/navigation";
import { searchSchema } from "@/lib/schemas/searchSchema";
import { Input } from "../ui/input";

type OfferSearchFormProps = {
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function OfferSearchForm({ setOpen }: OfferSearchFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [cities, setCities] = useState<City[]>([]);
  const router = useRouter();

  const currentUrl = useSearchParams();
  const currentParams = {
    country: currentUrl.get("country") || undefined,
    region: currentUrl.get("region") || undefined,
    city: currentUrl.get("city") || undefined,
    availableFrom: currentUrl.get("availableFrom") || undefined,
    availableTo: currentUrl.get("availableTo") || undefined,
    rentFrom: currentUrl.get("rentFrom") ? parseInt(currentUrl.get("rentFrom") as string) : undefined,
    rentTo: currentUrl.get("rentTo") ? parseInt(currentUrl.get("rentTo") as string) : undefined,
    surfaceAreaFrom: currentUrl.get("surfaceAreaFrom")
      ? parseInt(currentUrl.get("surfaceAreaFrom") as string)
      : undefined,
    surfaceAreaTo: currentUrl.get("surfaceAreaTo") ? parseInt(currentUrl.get("surfaceAreaTo") as string) : undefined,
  };

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: currentParams.city,
      rentFrom: currentParams.rentFrom || 0,
      rentTo: currentParams.rentTo || 0,
      surfaceAreaFrom: currentParams.surfaceAreaFrom || 0,
      surfaceAreaTo: currentParams.surfaceAreaTo || 0,
      dateRange: {
        from: currentParams.availableFrom ? parseLocalDateString(currentParams.availableFrom) : undefined,
        to: currentParams.availableTo ? parseLocalDateString(currentParams.availableTo) : undefined,
      },
    },
  });

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    const params = Object.fromEntries(
      Object.entries({
        country: selectedCountry,
        region: selectedRegion,
        city: values.city,
        availableFrom: values.dateRange?.from?.toLocaleDateString(),
        availableTo: values.dateRange?.to?.toLocaleDateString(),
        rentFrom: values.rentFrom ? values.rentFrom.toString() : undefined,
        rentTo: values.rentTo ? values.rentTo.toString() : undefined,
        surfaceAreaFrom: values.surfaceAreaFrom ? values.surfaceAreaFrom.toString() : undefined,
        surfaceAreaTo: values.surfaceAreaTo ? values.surfaceAreaTo.toString() : undefined,
      }).filter(([, value]) => value !== undefined)
    );

    const urlSearchParams = new URLSearchParams(params as Record<string, string>).toString();
    setOpen(false);
    router.push(`/offers?${urlSearchParams}`);
  }

  useEffect(() => {
    async function fetchCountries() {
      const countries = await getSupportedCountries();
      setCountries(countries);
    }

    fetchCountries();
    if (currentParams.country) {
      setSelectedCountry(currentParams.country);
    }
  }, []);

  useEffect(() => {
    async function fetchRegions() {
      if (!selectedCountry) return;

      const regions = await getSupportedRegions(selectedCountry);
      setRegions(regions);
    }

    fetchRegions();
    if (currentParams.region) {
      setSelectedRegion(currentParams.region);
    }
  }, [selectedCountry]);

  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) return;

      const cities = await getSupportedCities(selectedRegion);
      setCities(cities);
    }

    fetchCities();
  }, [selectedRegion]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-start gap-3">
        <div className="w-full text-left flex flex-col gap-3">
          <Label className="font-bold">Kraj</Label>
          <Select
            onValueChange={(e) => {
              setSelectedCountry(e);
            }}
            defaultValue={currentParams.country}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz kraj..." />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem value={country.isoCode} key={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full text-left flex flex-col gap-3">
          <Label className="font-bold">Województwo</Label>
          <Select
            onValueChange={(e) => {
              setSelectedRegion(e);
            }}
            defaultValue={currentParams.region}
            disabled={!selectedCountry}
          >
            <SelectTrigger>
              <SelectValue placeholder="Wybierz województwo..." />
            </SelectTrigger>
            <SelectContent>
              {regions.map((region) => (
                <SelectItem value={region.id} key={region.name}>
                  {region.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Miasto</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedRegion}>
                  <SelectTrigger>
                    <SelectValue placeholder="Wybierz miasto..." />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem value={city.name} key={city.name}>
                        {city.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Wybierz przedział dat</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "justify-start text-left font-normal w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value?.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y", { locale: pl })} -{" "}
                            {format(field.value.to, "LLL dd, y", { locale: pl })}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y", { locale: pl })
                        )
                      ) : (
                        <span>Wybierz datę</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 pointer-events-auto" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={field.value?.from}
                      selected={field.value}
                      onSelect={field.onChange}
                      numberOfMonths={2}
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rentFrom"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Cena od</FormLabel>
              <FormControl>
                <Input type="number" min={0} onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="rentTo"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Cena do</FormLabel>
              <FormControl>
                <Input type="number" min={0} onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surfaceAreaFrom"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Powierzchnia od</FormLabel>
              <FormControl>
                <Input type="number" min={0} onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surfaceAreaTo"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel className="font-bold">Powierzchnia do</FormLabel>
              <FormControl>
                <Input type="number" min={0} onChange={field.onChange} defaultValue={field.value} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className="font-bold tracking-wide mt-3 bg-yellow-400 w-full">
          Zastosuj
        </Button>
      </form>
    </Form>
  );
}
