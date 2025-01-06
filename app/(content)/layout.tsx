import Navbar from "@/components/navbar";
import AuthContextProvider from "@/contexts/auth-context";
import { getCurrentUser } from "@/lib/actions/user-actions";
import { ReactNode } from "react";

export default async function ContentLayout({ children }: { children: ReactNode }) {
  const user = await getCurrentUser();

  return (
    <AuthContextProvider currentUser={user}>
      <div className="h-screen w-screen bg-landing-page flex flex-col gap-14 items-center p-8">
        <Navbar />
        {children}
      </div>
    </AuthContextProvider>
  );
}
