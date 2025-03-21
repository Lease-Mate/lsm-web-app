"use client";

import { getSupportedCities, getSupportedCountries, getSupportedRegions } from "@/lib/actions/geo-actions";
import { offerEditSchema, offerSchema } from "@/lib/schemas/offerSchema";
import { City, Country, Region } from "@/lib/types/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Input } from "../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "../ui/calendar";
import { pl } from "date-fns/locale";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { editOffer } from "@/lib/actions/offer-actions";
import { Textarea } from "../ui/textarea";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type OfferFormProps = {
  offer: z.infer<typeof offerSchema> & {
    thumbnailId: string;
  };
};

export default function OfferEditForm({ offer }: OfferFormProps) {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<string>();
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedRegion, setSelectedRegion] = useState<string>();
  const [cities, setCities] = useState<City[]>([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchCountries() {
      const countries = await getSupportedCountries();
      setCountries(countries);
    }
    fetchCountries();
    if (offer) {
      setSelectedCountry(offer.address.country);
    }
  }, [offer]);

  useEffect(() => {
    async function fetchRegions() {
      if (!selectedCountry) return;

      const regions = await getSupportedRegions(selectedCountry);
      setRegions(regions);
    }

    fetchRegions();
    if (offer) {
      setSelectedRegion(offer.address.region);
    }
  }, [offer, selectedCountry]);

  useEffect(() => {
    async function fetchCities() {
      if (!selectedRegion) return;

      const cities = await getSupportedCities(selectedRegion);
      setCities(cities);
    }

    fetchCities();
  }, [selectedRegion]);

  const form = useForm<z.infer<typeof offerEditSchema>>({
    resolver: zodResolver(offerEditSchema),
    defaultValues: offer,
  });

  async function onSubmit(values: z.infer<typeof offerEditSchema>) {
    const result = await editOffer(offer.id, {
      ...values,
      thumbnailId: offer.thumbnailId,
    });
    if (!result.error) {
      toast.success("Oferta została zaktualizowana");
      router.push(`/offer/${offer.id}`);
    } else {
      toast.error("Nie udało się zaktualizować oferty");
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-5 flex flex-col gap-5">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Tytuł</FormLabel>
              <Input type="text" placeholder="Wprowadź tytuł..." {...field} />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Opis</FormLabel>
              <Textarea placeholder="Wprowadź opis..." {...field} />
            </FormItem>
          )}
        />

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="availableFrom"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Dostępne od</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground")}
                      >
                        {field.value ? format(field.value, "LLL dd, y", { locale: pl }) : <span>Wybierz datę</span>}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                  </PopoverContent>
                </Popover>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="rent"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Cena</FormLabel>
                <Input type="number" placeholder="Wprowadź cenę..." min={1} {...field} />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="address.country"
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <FormLabel className="font-bold">Kraj</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      setSelectedCountry(e);
                    }}
                    defaultValue={offer.address.country}
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
            name="address.region"
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <FormLabel className="font-bold">Województwo</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={(e) => {
                      field.onChange(e);
                      setSelectedRegion(e);
                    }}
                    defaultValue={offer.address.region}
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
            name="address.city"
            render={({ field }) => (
              <FormItem className="w-full text-left">
                <FormLabel className="font-bold">Miasto</FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} defaultValue={offer.address.city}>
                    <SelectTrigger>
                      <SelectValue placeholder="Wybierz miasto..." />
                    </SelectTrigger>
                    <SelectContent>
                      {cities.map((city) => (
                        <SelectItem value={city.cityId} key={city.cityId}>
                          {city.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address.street"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-bold">Ulica</FormLabel>
              <Input placeholder="Wprowadź ulicę..." {...field} />
            </FormItem>
          )}
        />

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="address.zipCode"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Kod pocztowy</FormLabel>
                <Input placeholder="Wprowadź kod pocztowy..." {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.buildingNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Numer budynku</FormLabel>
                <Input placeholder="Wprowadź numer budynku..." {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address.apartmentNumber"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Numer mieszkania</FormLabel>
                <Input placeholder="Wprowadź numer mieszkania..." {...field} />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-5">
          <FormField
            control={form.control}
            name="rooms"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Liczba pokoi</FormLabel>
                <Input type="number" placeholder="Wprowadź liczbę pokoi..." min={1} {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="surfaceArea"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Powierzchnia</FormLabel>
                <Input type="number" placeholder="Wprowadź powierzchnię..." min={1} {...field} />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="floor"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel className="font-bold">Piętro</FormLabel>
                <Input type="number" placeholder="Wprowadź piętro..." {...field} />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="font-bold tracking-wide mt-3 bg-yellow-400 w-full">
          {form.formState.isSubmitting ? "Zapisywanie..." : "Zapisz zmiany"}
        </Button>
      </form>
    </Form>
  );
}
