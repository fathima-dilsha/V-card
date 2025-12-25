"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/useAuth";
import Link from "next/link";
import { Loader2, Mail, Phone, MapPin, Globe, Share2, Link2, Video, Briefcase, Building2, User, Edit, LogOut, ExternalLink, Star } from "lucide-react";
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

  const getContactIcon = (type: string) => {
    const lowerType = type.toLowerCase();
    if (lowerType.includes('email')) return <Mail className="w-4 h-4" />;
    if (lowerType.includes('phone') || lowerType.includes('mobile')) return <Phone className="w-4 h-4" />;
    if (lowerType.includes('address') || lowerType.includes('location')) return <MapPin className="w-4 h-4" />;
    return <Globe className="w-4 h-4" />;
  };

  if (!isAuthorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <Loader2 className="animate-spin w-8 h-8 text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Digital Business Card</h1>
              <p className="text-sm text-gray-600 mt-1">Manage your professional profile</p>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Link href="/vcard/edit">
                <Button variant="outline" size="sm" className="gap-2">
                  <Edit className="w-4 h-4" />
                  <span className="hidden sm:inline">Edit</span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={handleLogout} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoadingVCard ? (
          <div className="flex flex-col justify-center items-center py-20">
            <Loader2 className="animate-spin w-10 h-10 text-blue-600 mb-4" />
            <span className="text-gray-600">Loading your vCard...</span>
          </div>
        ) : vcard ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Complete vCard in Single Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                {/* Profile Header */}
                <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200">
                  <User className="w-5 h-5 text-blue-600" />
                  <h3 className="text-xl font-semibold text-gray-900">Complete Profile</h3>
                </div>

                {/* Profile Information */}
                <div className="mb-8">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                      {vcard.name?.charAt(0) || 'U'}
                    </div>
                    <div className="flex-1">
                      <div className="mb-3">
                        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Full Name</label>
                        <h2 className="text-3xl font-bold text-gray-900 mt-1">
                          {vcard.name}
                        </h2>
                      </div>
                      {vcard.jobTitle && (
                        <div className="mb-2">
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Job Title</label>
                          <div className="flex items-center gap-2 text-gray-700 mt-1">
                            <Briefcase className="w-4 h-4" />
                            <span className="text-lg font-medium">{vcard.jobTitle}</span>
                          </div>
                        </div>
                      )}
                      {vcard.companyName && (
                        <div>
                          <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Company</label>
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <Building2 className="w-4 h-4" />
                            <span>{vcard.companyName}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {vcard.heading && (
                    <div className="mt-4">
                      <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Professional Headline</label>
                      <p className="text-gray-700 text-lg font-medium italic mt-2">
                        "{vcard.heading}"
                      </p>
                    </div>
                  )}
                </div>

                {/* About Section */}
                {vcard.description && (
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">About Me</label>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {vcard.description}
                    </p>
                  </div>
                )}

                {/* Video Section */}
                {vcard.videoUrl && (
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3 block">Introduction Video</label>
                    <a
                      href={vcard.videoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline break-all"
                    >
                      <Video className="w-4 h-4" />
                      <span>Watch video</span>
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                )}

                {/* Contact Details */}
                {vcard.contacts && vcard.contacts.length > 0 && (
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 block">Contact Information</label>
                    <div className="space-y-3">
                      {vcard.contacts.map((contact: any) => (
                        <div
                          key={contact.id}
                          className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                        >
                          <div className="mt-1 text-blue-600">
                            {getContactIcon(contact.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-gray-900">{contact.type}</p>
                              {contact.isPrimary && (
                                <span className="inline-flex items-center gap-1 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                                  <Star className="w-3 h-3 fill-current" />
                                  Primary
                                </span>
                              )}
                            </div>
                            <p className="text-gray-700 mt-1">{contact.value}</p>
                            {contact.label && (
                              <p className="text-sm text-gray-500 mt-1">{contact.label}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Social Links */}
                {vcard.socialLinks && vcard.socialLinks.length > 0 && (
                  <div className="mb-8 pb-8 border-b border-gray-200">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 block">Social Media</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {vcard.socialLinks.map((link: any) => (
                        <a
                          key={link.id}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg hover:from-blue-50 hover:to-indigo-50 transition-all border border-gray-200 hover:border-blue-300 group"
                        >
                          <Globe className="w-5 h-5 text-gray-600 group-hover:text-blue-600" />
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900">{link.platform}</p>
                            {link.username && (
                              <p className="text-sm text-gray-600">@{link.username}</p>
                            )}
                          </div>
                          <ExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* Web Links */}
                {vcard.webLinks && vcard.webLinks.length > 0 && (
                  <div>
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-4 block">Web Links</label>
                    <div className="space-y-3">
                      {vcard.webLinks
                        .sort((a: any, b: any) => (a.order || 0) - (b.order || 0))
                        .map((link: any) => (
                          <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-all border border-blue-200 hover:border-blue-300 group"
                          >
                            <Link2 className="w-5 h-5 text-blue-600" />
                            <div className="flex-1">
                              <p className="font-semibold text-blue-900">{link.title}</p>
                              <p className="text-sm text-blue-700 break-all">{link.url}</p>
                            </div>
                            <ExternalLink className="w-4 h-4 text-blue-600" />
                          </a>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Actions Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Edit className="w-5 h-5 text-blue-600" />
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <Link href="/vcard/edit" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                      <Edit className="w-4 h-4" />
                      Edit Profile Details
                    </Button>
                  </Link>
                  <Link href="/vcard/contacts" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                      <Phone className="w-4 h-4" />
                      Manage Contact Info
                    </Button>
                  </Link>
                  <Link href="/vcard/social-links" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                      <Share2 className="w-4 h-4" />
                      Manage Social Media
                    </Button>
                  </Link>
                  <Link href="/vcard/web-links" className="block">
                    <Button variant="outline" className="w-full justify-start gap-2 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300">
                      <Link2 className="w-4 h-4" />
                      Manage Web Links
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs text-gray-500 text-center">
                    Tip: Keep your vCard updated to make a great impression
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center max-w-2xl mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
              <User className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Create Your Digital Business Card</h2>
            <p className="text-gray-600 mb-6">You haven't created your vCard yet. Get started now and share your professional profile with the world!</p>
            <Link href="/vcard/create">
              <Button size="lg" className="gap-2">
                <Edit className="w-5 h-5" />
                Create Your vCard
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}