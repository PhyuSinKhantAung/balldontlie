"use client";
import { selectIsAuthenticated } from "@/features/auth/authSelectors";
import { useAppSelector } from "@/lib/redux/hooks";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      redirect("/auth/login");
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) return null;

  return <>{children}</>;
}
