"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { LocalStorage } from "@/utility/LocalStorage";
import { useGetCompleteVCard } from "@/hooks/useVCard";

export default function DashboardPage() {
  const router = useRouter();
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [user, setUser] = useState<any>(null);

  const { data: vcard, isLoading: isLoadingVCard } = useGetCompleteVCard();
  const logoutMutation = useLogout();

  useEffect(() => {
    const token = LocalStorage.getItem("auth_token");
    const userData = LocalStorage.getItem("user");

    if (!token) {
      router.push("/login");
      return;
    }

    setUser(userData);
    setIsAuthorized(true);
  }, [router]);

  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600 mt-1">Welcome, {user?.fullName}!</p>
          </div>
          <div className="flex gap-3">
            <Link href="/vcard/edit">
              <Button variant="outline">Edit vCard</Button>
            </Link>
            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        {isLoadingVCard ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="animate-spin mr-2" />
            <span>Loading vCard...</span>
          </div>
        ) : vcard ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* vCard Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h2 className="text-4xl font-bold text-gray-800 mb-2">
                  {vcard.name}
                </h2>
                {vcard.jobTitle && (
                  <p className="text-xl text-gray-600 mb-1">{vcard.jobTitle}</p>
                )}
                {vcard.companyName && (
                  <p className="text-lg text-gray-500 mb-4">
                    @ {vcard.companyName}
                  </p>
                )}

                {vcard.heading && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Heading
                    </h3>
                    <p className="text-gray-600">{vcard.heading}</p>
                  </div>
                )}

                {vcard.description && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      About
                    </h3>
                    <p className="text-gray-600 whitespace-pre-wrap">
                      {vcard.description}
                    </p>
                  </div>
                )}

                {vcard.videoUrl && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-2">
                      Video
                    </h3>
                    <a
                      href={vcard.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {vcard.videoUrl}
                    </a>
                  </div>
                )}

                {/* Contact Details */}
                {vcard.contacts && vcard.contacts.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Contact Details
                    </h3>
                    <div className="space-y-2">
                      {vcard.contacts.map((contact: any) => (
                        <div
                          key={contact.id}
                          className="flex justify-between items-center p-3 bg-gray-50 rounded"
                        >
                          <div>
                            <p className="font-medium text-gray-700">
                              {contact.type}
                            </p>
                            <p className="text-gray-600">{contact.value}</p>
                            {contact.label && (
                              <p className="text-sm text-gray-500">
                                {contact.label}
                              </p>
                            )}
                          </div>
                          {contact.isPrimary && (
                            <span className="bg-green-100 text-green-800 text-xs px-3 py-1 rounded">
                              Primary
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {vcard.socialLinks && vcard.socialLinks.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Social Links
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                      {vcard.socialLinks.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-3 bg-gray-50 rounded hover:bg-gray-100 transition"
                        >
                          <p className="font-medium text-gray-700">
                            {link.platform}
                          </p>
                          {link.username && (
                            <p className="text-sm text-gray-600">
                              @{link.username}
                            </p>
                          )}
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Web Links */}
                {vcard.webLinks && vcard.webLinks.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700 mb-3">
                      Web Links
                    </h3>
                    <div className="space-y-2">
                      {vcard.webLinks
                        .sort(
                          (a: any, b: any) => (a.order || 0) - (b.order || 0)
                        )
                        .map((link: any) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block p-3 bg-blue-50 rounded hover:bg-blue-100 transition"
                          >
                            <p className="font-medium text-blue-700">
                              {link.title}
                            </p>
                            <p className="text-sm text-blue-600 break-all">
                              {link.url}
                            </p>
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link href="/vcard/edit" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Edit vCard
                    </Button>
                  </Link>
                  <Link href="/vcard/contacts" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Manage Contacts
                    </Button>
                  </Link>
                  <Link href="/vcard/social-links" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Manage Social Links
                    </Button>
                  </Link>
                  <Link href="/vcard/web-links" className="block">
                    <Button variant="outline" className="w-full justify-start">
                      Manage Web Links
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-600 mb-6">You don't have a vCard yet.</p>
            <Link href="/vcard/create">
              <Button size="lg">Create Your vCard</Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
