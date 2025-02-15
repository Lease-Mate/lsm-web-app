"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { LogIn, User, UserRoundPlus } from "lucide-react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { logout } from "@/lib/actions/user-actions";
import { useRef } from "react";
import Logo from "./logo";
import { toast } from "sonner";

export default function Navbar() {
  const { user } = useAuth();
  const formRef = useRef<HTMLFormElement>(null);

  const handleLogout = async () => {
    toast.success("Wylogowano pomyślnie");
    await logout();
  };

  return (
    <nav className="w-full h-[8%] px-5 flex justify-center text-gray-900 tracking-wide">
      <div className="w-[95%] h-full flex justify-between flex-row font-bold p-4 shadow-lg bg-background">
        <Logo className="w-1/5 text-[2.75rem]" />
        <div className="w-3/5 flex flex-row justify-center items-center gap-10 text-[15px]">
          <Link
            href={"/offers"}
            className="flex justify-center items-center hover:before:scale-x-100 hover:before:origin-left relative before:w-full before:h-[2px] before:origin-right before:transition-transform before:duration-300 before:scale-x-0 before:bg-gray-900 before:absolute before:left-0 before:bottom-0"
          >
            Oferty
          </Link>
          <Link
            href={user ? "/offer/create" : "/login"}
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
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="w-1/5 flex items-center justify-end">
                <Button size={"icon"} className="mr-2 rounded-lg">
                  <User strokeWidth={2.5} />
                </Button>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.name + " " + user.surname}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/my-offers"}>Moje oferty</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href={"/offer/rent/ask"}>Zapytania</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={"/offer/rents"}>Wynajmy</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Ustawienia</DropdownMenuItem>
              <DropdownMenuItem>Pomoc</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <form action={handleLogout} className="flex" ref={formRef}>
                  <div className="flex-1 cursor-pointer" onClick={() => formRef.current?.requestSubmit()}>
                    Wyloguj
                  </div>
                </form>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="w-1/5 flex justify-center items-center gap-2">
            <Link href={"/register"}>
              <Button variant={"default"} className="px-10 tracking-wide font-bold">
                Zarejestruj
                <UserRoundPlus strokeWidth={2.5} />
              </Button>
            </Link>
            <Link href={"/login"}>
              <Button variant={"default"} className="px-10 tracking-wide font-bold">
                Zaloguj
                <LogIn strokeWidth={2.5} />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
