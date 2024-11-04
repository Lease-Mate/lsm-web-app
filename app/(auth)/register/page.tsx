import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePickerWithButtons } from "../components/date-picker";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center w-1/2 gap-10">
      <div>
        <h1 className="font-bold text-2xl">Załóż darmowe konto!</h1>
        <h3 className="text-muted-foreground text-center">Dziękujemy za zaufanie.</h3>
      </div>
      <div className="w-1/2 flex flex-col gap-5">
        <div>
          <Label htmlFor="email" className="font-bold">
            Email
          </Label>
          <Input type="email" id="email" />
        </div>
        <div>
          <Label htmlFor="password" className="font-bold">
            Hasło
          </Label>
          <Input type="password" id="password" />
        </div>
        <div>
          <Label htmlFor="name" className="font-bold">
            Imię
          </Label>
          <Input type="text" id="name" />
        </div>
        <div>
          <Label htmlFor="surname" className="font-bold">
            Nazwisko
          </Label>
          <Input type="text" id="surname" />
        </div>
        <div className="flex flex-col gap-1">
          <Label htmlFor="dob" className="font-bold">
            Data urodzenia
          </Label>
          <DatePickerWithButtons />
        </div>
        <Button className="w-full font-bold">Zarejestruj się</Button>
      </div>
    </div>
  );
}
