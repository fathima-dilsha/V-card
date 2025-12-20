"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import LoginForm from "@/components/auth/LoginForm";
import { vCardApi } from "@/api/vcard";

export default function LoginPage() {
  const router = useRouter();

  async function handleLogin(formData: {
    email: string;
    password: string;
  }) {
    try {
      const response = await vCardApi.login({
        email: formData.email,
        password: formData.password,
      });

      // Store token and user data in localStorage
      localStorage.setItem("auth_token", response.token);
      localStorage.setItem("user", JSON.stringify({
        id: response.id,
        fullName: response.fullName,
        email: response.email,
      }));

      toast.success("Login successful!");
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      throw error;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
          <p className="text-gray-600">Access your vCard</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <LoginForm onSubmit={handleLogin} />

          <div className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link
              href="/auth/register"
              className="text-blue-600 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
