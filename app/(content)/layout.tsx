import Navbar from "@/components/navbar";
import { ReactNode } from "react";

export default function ContentLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-landing-page flex flex-col gap-20 items-center">
      <Navbar />
      {children}
    </div>
  );
}
