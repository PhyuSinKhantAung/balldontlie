"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/lib/redux/hooks";
import { login } from "../authSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { LoginSchema, loginSchema } from "../schemas/login.schema";
import { redirect } from "next/navigation";
import { Label } from "@/components/ui/label";

export function LoginForm() {
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginSchema) => {
    console.log("data", data);
    dispatch(login({ id: "1", name: data.name }));
    redirect("/home");
  };
  return (
    <form
      className="flex min-h-screen items-center justify-center"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full max-w-sm rounded-lg p-4 shadow-md">
        <h6 className="text-center md:text-xl">Login</h6>
        <div className="space-y-6">
          <div>
            <Label htmlFor="email" className="block">
              Username
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Enter your name"
              {...register("name")}
            />
            {errors?.name && (
              <p className="text-sm text-destructive">
                {errors?.name?.message}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password" className="block">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Enter your password"
              {...register("password")}
            />
            {errors?.password && (
              <p className="text-sm text-destructive">
                {errors?.password?.message}
              </p>
            )}
          </div>
          <Button className="w-full" type="submit">
            Login
          </Button>
        </div>
      </div>
    </form>
  );
}
