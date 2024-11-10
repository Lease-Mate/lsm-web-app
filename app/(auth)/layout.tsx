import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="h-screen w-screen bg-gray-50 flex flex-col gap-14 items-center justify-center">{children}</div>
  );
}
