import { Button } from "@/components/ui/button";
import { LogIn, UserRoundPlus } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full h-[8%] px-5 mt-5 flex justify-center text-gray-900 tracking-wide">
      <div className="w-[95%] h-full flex justify-between flex-row font-bold p-4 shadow-lg bg-background">
        <Link href={"/"} className="w-1/5 flex justify-center items-center text-3xl">
          Lease<span className="text-primary bg-secondary">Mate</span>
        </Link>
        <div className="w-3/5 flex flex-row justify-center items-center gap-10 text-[15px]">
          <Link
            href={"#"}
            className="flex justify-center items-center hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-900 before:absolute before:left-0 before:bottom-0"
          >
            Oferty
          </Link>
          <Link
            href={"#"}
            className="flex justify-center items-center hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-900 before:absolute before:left-0 before:bottom-0"
          >
            Wynajmij
          </Link>
          <Link
            href={"#"}
            className="flex justify-center items-center hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-900 before:absolute before:left-0 before:bottom-0"
          >
            O nas
          </Link>
          <Link
            href={"#"}
            className="flex justify-center items-center hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-900 before:absolute before:left-0 before:bottom-0"
          >
            Kontakt
          </Link>
        </div>
        <div className="w-1/5 flex justify-center items-center gap-2">
          <Link href={"/register"}>
            <Button variant={"default"} className="px-10 tracking-wide font-bold">
              Zarejestruj
              <LogIn strokeWidth={2.5} />
            </Button>
          </Link>
          <Link href={"/login"}>
            <Button variant={"default"} className="px-10 tracking-wide font-bold">
              Zaloguj
              <UserRoundPlus strokeWidth={2.5} />
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
