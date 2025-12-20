"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { LocalStorage } from "@/utility/LocalStorage";

export default function Home() {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const token = LocalStorage.getItem("auth_token");
    if (token) {
      router.push("/dashboard");
    }
  }, [router]);

  if (!isClient) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Your Digital vCard
        </h1>
        <p className="text-xl md:text-2xl text-gray-700 mb-8">
          Create and share your professional digital business card in seconds
        </p>

        <div className="flex gap-4 justify-center flex-col sm:flex-row">
          <Link href="/register">
            <Button size="lg" className="w-full sm:w-auto">
              Get Started
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Sign In
            </Button>
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold mb-2">Create</h3>
            <p className="text-gray-600">
              Build your professional profile in minutes
            </p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-3">🔗</div>
            <h3 className="text-lg font-semibold mb-2">Connect</h3>
            <p className="text-gray-600">Add all your social and web links</p>
          </div>
          <div className="p-6 bg-white rounded-lg shadow-lg">
            <div className="text-3xl mb-3">📱</div>
            <h3 className="text-lg font-semibold mb-2">Share</h3>
            <p className="text-gray-600">
              Share your vCard instantly with anyone
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
