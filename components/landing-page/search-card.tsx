import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Label } from "../ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { DatePickerWithRange } from "./date-picker-range";

//TODO: Add form

export default function SearchCard() {
  return (
    <Card className="w-[30%] flex flex-col shadow-lg items-center text-center p-5 text-gray-900 bg-gray-50">
      <CardHeader>
        <CardTitle className="font-bold tracking-normal">Znajdź miejsce do wynajęcia</CardTitle>
        <CardDescription>Odnajdź swoją wymarzoną nieruchomość</CardDescription>
      </CardHeader>
      <CardContent className="w-[90%] flex flex-col gap-10 mt-5">
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="searchCountry" className="font-bold">
            Kraj
          </Label>
          <Select>
            <SelectTrigger id="searchCountry">
              <SelectValue placeholder="Wybierz kraj..."></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nigeria">Polska</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="searchRegion" className="font-bold">
            Województwo
          </Label>
          <Select>
            <SelectTrigger id="searchRegion">
              <SelectValue placeholder="Wybierz województwo..."></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nigeria">Małopolskie</SelectItem>
              <SelectItem value="Ghana">Wielkopolskie</SelectItem>
              <SelectItem value="Kenya">Pomorskie</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="searchCity" className="font-bold">
            Miasto
          </Label>
          <Select>
            <SelectTrigger id="searchCity">
              <SelectValue placeholder="Wybierz miasto..."></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Nigeria">Kraków</SelectItem>
              <SelectItem value="Ghana">Warszawa</SelectItem>
              <SelectItem value="Kenya">Wrocław</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col items-start gap-1">
          <Label htmlFor="searchCountry" className="font-bold">
            Data rozpoczęcia najmu
          </Label>
          <DatePickerWithRange className="w-full" />
        </div>
        <Button className="font-bold tracking-wide mt-2 bg-yellow-400">Wyszukaj</Button>
      </CardContent>
    </Card>
  );
}
