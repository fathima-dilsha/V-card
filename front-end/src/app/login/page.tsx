"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLogin } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const loginMutation = useLogin();

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    try {
      await loginMutation.mutateAsync(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Login
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="john@example.com"
              {...register("email")}
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full"
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••"
              {...register("password")}
              disabled={isSubmitting || loginMutation.isPending}
              className="w-full"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting || loginMutation.isPending}
            className="w-full"
          >
            {loginMutation.isPending ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?{" "}
          <Link
            href="/register"
            className="text-blue-600 hover:underline font-semibold"
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
