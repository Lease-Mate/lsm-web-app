import { cn } from "@/lib/utils";
import { Outfit } from "next/font/google";
import Link from "next/link";

type LogoProps = {
  className?: string;
};

const lugrasimo = Outfit({
  weight: "500",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

export default function Logo(props: LogoProps) {
  return (
    <Link href={"/"} className={cn("flex justify-center items-center", lugrasimo.className, props.className)}>
      Lease<span className="text-primary">Mate</span>
    </Link>
  );
}
