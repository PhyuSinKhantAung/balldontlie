"use client";
import { selectIsAuthenticated } from "@/features/auth/authSelectors";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { useAppSelector } from "@/lib/redux/hooks";
import { redirect } from "next/navigation";

export default function Login() {
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  if (isAuthenticated) {
    redirect("/home");
  }

  return <LoginForm />;
}
