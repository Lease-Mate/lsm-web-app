"use client";

import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { z } from "zod";
import { searchCardSchema } from "@/lib/schemas/searchCardSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useEffect, useState } from "react";
import {
  getSupportedCities,
  getSupportedCountries,
  getSupportedRegions,
  searchOffers,
} from "@/lib/actions/search-actions";
import { City, Country, Region } from "@/lib/types";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "../ui/calendar";

export default function SearchCardForm() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [cities, setCities] = useState<City[]>([]);

  const form = useForm<z.infer<typeof searchCardSchema>>({
    resolver: zodResolver(searchCardSchema),
    defaultValues: {
      country: "",
      region: "",
      city: "",
    },
  });

  async function onSubmit(values: z.infer<typeof searchCardSchema>) {
    const searchResult = await searchOffers(values);
    console.log(values);
    console.log(searchResult);
  }

  useEffect(() => {
    async function fetchCountries() {
      const countries = await getSupportedCountries();
      setCountries(countries);
    }

    fetchCountries();
  }, []);

  useEffect(() => {
    async function fetchRegions() {
      if (!selectedCountry) return;

      const regions = await getSupportedRegions(selectedCountry);
      setRegions(regions);
    }

    fetchRegions();
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
        <FormField
          control={form.control}
          name="country"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel>Kraj</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setSelectedCountry(e);
                  }}
                  defaultValue={field.value}
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
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel>Województwo</FormLabel>
              <FormControl>
                <Select
                  onValueChange={(e) => {
                    field.onChange(e);
                    setSelectedRegion(e);
                  }}
                  defaultValue={field.value}
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
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className="w-full text-left">
              <FormLabel>Miasto</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
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
              <FormLabel>Wybierz przedział dat</FormLabel>
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
                  <PopoverContent className="w-auto p-0" align="start">
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
        <Button type="submit" className="font-bold tracking-wide mt-3 bg-yellow-400 w-full">
          Wyszukaj
        </Button>
      </form>
    </Form>
  );
}
