"use client";
import { ReactNode } from "react";
import { useAuth, AuthContextType } from "@/context/authentication";
import { useRouter } from "next/navigation"; // Correct import for Next.js router

interface FooterProps {
  children?: ReactNode;
}

export default function ProtectedRoutes({ children }: FooterProps) {
  const { user } = useAuth() as AuthContextType;
  const router = useRouter();

  if (!user) {
    router.push("/login");
    return null;
  }

  return <>{children}</>;
}
