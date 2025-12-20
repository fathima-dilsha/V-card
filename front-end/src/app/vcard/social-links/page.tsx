"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetSocialLinks,
  useCreateSocialLink,
  useUpdateSocialLink,
  useDeleteSocialLink,
} from "@/hooks/useVCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Trash2, Edit2 } from "lucide-react";

const PLATFORMS = [
  "INSTAGRAM",
  "FACEBOOK",
  "LINKEDIN",
  "TWITTER",
  "YOUTUBE",
  "TIKTOK",
  "GITHUB",
  "PINTEREST",
  "SNAPCHAT",
  "WHATSAPP",
  "TELEGRAM",
  "OTHER",
];

const socialLinkSchema = z.object({
  platform: z.enum(PLATFORMS as any),
  url: z.string().url("Invalid URL"),
  username: z.string().optional(),
});

type SocialLinkFormData = z.infer<typeof socialLinkSchema>;

export default function SocialLinksPage() {
  const { data: socialLinks = [], isLoading } = useGetSocialLinks();
  const createMutation = useCreateSocialLink();
  const updateMutation = useUpdateSocialLink();
  const deleteMutation = useDeleteSocialLink();

  const [editingId, setEditingId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SocialLinkFormData>({
    resolver: zodResolver(socialLinkSchema),
    defaultValues: {
      platform: "LINKEDIN",
    },
  });

  const onSubmit = async (data: SocialLinkFormData) => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          socialLinkId: editingId,
          data,
        });
        setEditingId(null);
      } else {
        await createMutation.mutateAsync(data);
      }
      reset();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleEdit = (link: any) => {
    setEditingId(link.id);
    reset(link);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this social link?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Social Links
              </h1>
              <p className="text-gray-600 mt-2">
                Add and manage your social media profiles
              </p>
            </div>
            <Link href="/dashboard">
              <Button variant="outline">Back to Dashboard</Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                {editingId ? "Edit Social Link" : "Add New Social Link"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label
                    htmlFor="platform"
                    className="block text-sm font-medium mb-1"
                  >
                    Platform *
                  </Label>
                  <select
                    id="platform"
                    {...register("platform")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    {PLATFORMS.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="url"
                    className="block text-sm font-medium mb-1"
                  >
                    Profile URL *
                  </Label>
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://..."
                    {...register("url")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                  {errors.url && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.url.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="username"
                    className="block text-sm font-medium mb-1"
                  >
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="@username"
                    {...register("username")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                    className="flex-1"
                  >
                    {editingId ? "Update" : "Add"}
                  </Button>
                  {editingId && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      disabled={
                        createMutation.isPending || updateMutation.isPending
                      }
                    >
                      Cancel
                    </Button>
                  )}
                </div>
              </form>
            </div>
          </div>

          {/* List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-lg font-semibold mb-4">
                Your Social Links ({socialLinks.length})
              </h2>

              {isLoading ? (
                <p className="text-gray-600">Loading social links...</p>
              ) : socialLinks.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No social links yet. Add one to get started!
                </p>
              ) : (
                <div className="space-y-3">
                  {socialLinks.map((link: any) => (
                    <div
                      key={link.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-2 items-center mb-2">
                            <span className="inline-block bg-purple-100 text-purple-800 text-xs px-2 py-1 rounded font-semibold">
                              {link.platform}
                            </span>
                          </div>
                          {link.username && (
                            <p className="font-medium text-gray-800">
                              @{link.username}
                            </p>
                          )}
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:underline break-all"
                          >
                            {link.url}
                          </a>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(link)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            disabled={
                              updateMutation.isPending ||
                              deleteMutation.isPending
                            }
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded"
                            disabled={
                              updateMutation.isPending ||
                              deleteMutation.isPending
                            }
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
