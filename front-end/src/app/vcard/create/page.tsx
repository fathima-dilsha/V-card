"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCreateVCard } from "@/hooks/useVCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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

export default function CreateVCardPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VCardFormData>({
    resolver: zodResolver(vCardSchema),
  });

  const createVCardMutation = useCreateVCard();

  const onSubmit = async (data: VCardFormData) => {
    try {
      await createVCardMutation.mutateAsync({
        ...data,
        videoUrl: data.videoUrl || undefined,
      });
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Error creating vCard:", error);
      // Error will be shown by the mutation's onError handler
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-2 text-gray-800">
            Create Your vCard
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in your information to create your digital business card
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
                disabled={createVCardMutation.isPending}
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
                  disabled={createVCardMutation.isPending}
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
                  disabled={createVCardMutation.isPending}
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
                disabled={createVCardMutation.isPending}
                className="w-full"
              />
              {errors.heading && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.heading.message}
                </p>
              )}
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
                disabled={createVCardMutation.isPending}
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
                disabled={createVCardMutation.isPending}
                className="w-full"
              />
              {errors.videoUrl && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.videoUrl.message}
                </p>
              )}
            </div>

            <div className="flex gap-4 pt-6">
              <Button
                type="submit"
                disabled={createVCardMutation.isPending}
                className="flex-1"
              >
                {createVCardMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create vCard"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={createVCardMutation.isPending}
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
