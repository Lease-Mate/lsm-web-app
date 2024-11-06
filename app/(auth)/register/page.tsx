import { RegisterForm } from "@/components/auth/register-form";

export default function LoginPage() {
  return (
    <div className="flex-1 flex flex-col items-center w-1/2 gap-10">
      <div>
        <h1 className="font-bold text-2xl">Załóż darmowe konto!</h1>
        <h3 className="text-muted-foreground text-center">Dziękujemy za zaufanie.</h3>
      </div>
      <RegisterForm />
    </div>
  );
}
