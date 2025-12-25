"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useGetVCard, useUpdateVCard } from "@/hooks/useVCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";

const vCardSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  jobTitle: z.string().optional(),
  companyName: z.string().optional(),
  heading: z.string().optional(),
  description: z.string().optional(),
  videoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type VCardFormData = z.infer<typeof vCardSchema>;

export default function EditVCardPage() {
  const router = useRouter();
  const { data: vcard, isLoading: isLoadingVCard } = useGetVCard();
  const updateVCardMutation = useUpdateVCard();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VCardFormData>({
    resolver: zodResolver(vCardSchema),
  });

  useEffect(() => {
    if (vcard) {
      reset({
        name: vcard.name,
        jobTitle: vcard.jobTitle || "",
        companyName: vcard.companyName || "",
        heading: vcard.heading || "",
        description: vcard.description || "",
        videoUrl: vcard.videoUrl || "",
      });
    }
  }, [vcard, reset]);

  const onSubmit = async (data: VCardFormData) => {
    try {
      await updateVCardMutation.mutateAsync({
        ...data,
        videoUrl: data.videoUrl || undefined,
      });
      router.push("/dashboard");
    } catch (error) {
      console.error("Error updating vCard:", error);
    }
  };

  if (isLoadingVCard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  }

  if (!vcard) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">vCard not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Edit Your vCard
          </h1>
          <p className="text-gray-600 mb-8">
            Update your digital business card information
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <Label htmlFor="name" className="block text-sm font-medium mb-2">
                Full Name *
              </Label>
              <Input
                id="name"
                placeholder="John Doe"
                {...register("name")}
                disabled={updateVCardMutation.isPending}
                className="w-full"
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="jobTitle"
                  className="block text-sm font-medium mb-2"
                >
                  Job Title
                </Label>
                <Input
                  id="jobTitle"
                  placeholder="Senior Developer"
                  {...register("jobTitle")}
                  disabled={updateVCardMutation.isPending}
                  className="w-full"
                />
              </div>

              <div>
                <Label
                  htmlFor="companyName"
                  className="block text-sm font-medium mb-2"
                >
                  Company Name
                </Label>
                <Input
                  id="companyName"
                  placeholder="Tech Corp"
                  {...register("companyName")}
                  disabled={updateVCardMutation.isPending}
                  className="w-full"
                />
              </div>
            </div>

            <div>
              <Label
                htmlFor="heading"
                className="block text-sm font-medium mb-2"
              >
                Heading
              </Label>
              <Input
                id="heading"
                placeholder="Full Stack Developer"
                {...register("heading")}
                disabled={updateVCardMutation.isPending}
                className="w-full"
              />
            </div>

            <div>
              <Label
                htmlFor="description"
                className="block text-sm font-medium mb-2"
              >
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Tell us about yourself..."
                rows={5}
                {...register("description")}
                disabled={updateVCardMutation.isPending}
                className="w-full"
              />
            </div>

            <div>
              <Label
                htmlFor="videoUrl"
                className="block text-sm font-medium mb-2"
              >
                Video URL
              </Label>
              <Input
                id="videoUrl"
                type="url"
                placeholder="https://youtube.com/watch?v=..."
                {...register("videoUrl")}
                disabled={updateVCardMutation.isPending}
                className="w-full"
              />
              {errors.videoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.videoUrl.message}
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 pt-6">
              <Button
                type="submit"
                disabled={updateVCardMutation.isPending}

              >
                {updateVCardMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update vCard"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={updateVCardMutation.isPending}
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
