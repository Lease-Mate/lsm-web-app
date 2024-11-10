import { RegisterForm } from "@/components/auth/register-form";
import Logo from "@/components/logo";

export default function RegisterPage() {
  return (
    <div className="flex flex-col items-center w-1/2 gap-10">
      <Logo className="text-6xl" />
      <div>
        <h1 className="font-bold text-2xl">Załóż darmowe konto!</h1>
        <h3 className="text-muted-foreground text-center">Dziękujemy za zaufanie.</h3>
      </div>
      <RegisterForm />
    </div>
  );
}
