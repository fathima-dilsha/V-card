"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import RegisterForm from "@/components/auth/RegisterForm";
import { vCardApi } from "@/api/vcard";

export default function RegisterPage() {
  const router = useRouter();

  async function handleRegister(formData: {
    fullName: string;
    email: string;
    password: string;
    confirmPassword: string;
  }) {
    try {
      await vCardApi.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });
      toast.success("Registration successful! Please login.");
      setTimeout(() => router.push("/auth/login"), 1500);
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
      throw error;
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h1>
          <p className="text-gray-600">Create your vCard account</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <RegisterForm onSubmit={handleRegister} />

          <div className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-600 hover:underline">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
