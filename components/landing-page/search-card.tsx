import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import SearchCardForm from "./search-card-form";

export default function SearchCard() {
  return (
    <Card className="w-[30%] flex flex-col shadow-lg items-center text-center p-5 text-gray-900 bg-gray-50">
      <CardHeader>
        <CardTitle className="font-bold tracking-normal">Znajdź miejsce do wynajęcia</CardTitle>
        <CardDescription>Odnajdź swoją wymarzoną nieruchomość</CardDescription>
      </CardHeader>
      <CardContent className="w-[90%] flex flex-col gap-10 mt-5">
        <SearchCardForm />
      </CardContent>
    </Card>
  );
}
