import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AuthLayout() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-md w-full mx-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">vCard</h1>
          <p className="text-gray-600">Digital Business Card</p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 space-y-6">
          <div className="flex flex-col gap-4">
            <Link href="/auth/register" className="w-full">
              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                Create Account
              </Button>
            </Link>

            <Link href="/auth/login" className="w-full">
              <Button
                variant="outline"
                className="w-full border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Sign In
              </Button>
            </Link>
          </div>

          <div className="text-center text-sm text-gray-600">
            <p>Create your digital vCard and share it with anyone, anywhere.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
