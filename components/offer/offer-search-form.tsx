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
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { pl } from "date-fns/locale";
import { Calendar } from "../ui/calendar";
import { Label } from "../ui/label";
import { useRouter } from "next/navigation";
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

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      city: "",
      rentFrom: 0,
      rentTo: 0,
      surfaceAreaFrom: 0,
      surfaceAreaTo: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof searchSchema>) {
    const params = Object.fromEntries(
      Object.entries({
        city: values.city,
        availableTo: values.dateRange?.to?.toISOString().split("T")[0],
        rentFrom: values.rentFrom ? values.rentFrom.toString() : undefined,
        rentTo: values.rentTo ? values.rentTo.toString() : undefined,
        surfaceAreaFrom: values.surfaceAreaFrom ? values.surfaceAreaFrom.toString() : undefined,
        surfaceAreaTo: values.surfaceAreaTo ? values.surfaceAreaTo.toString() : undefined,
      }).filter(([_, value]) => value !== undefined)
    );

    const urlParams = new URLSearchParams(params as Record<string, string>).toString();
    setOpen(false);
    router.push(`/offers?${urlParams}`);
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
        <div className="w-full text-left flex flex-col gap-3">
          <Label className="font-bold">Kraj</Label>
          <Select
            onValueChange={(e) => {
              setSelectedCountry(e);
            }}
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
