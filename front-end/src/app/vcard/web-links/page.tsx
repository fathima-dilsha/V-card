"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetWebLinks,
  useCreateWebLink,
  useUpdateWebLink,
  useDeleteWebLink,
} from "@/hooks/useVCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Trash2, Edit2, GripVertical } from "lucide-react";

const webLinkSchema = z.object({
  title: z.string().min(1, "Title is required"),
  url: z.string().url("Invalid URL"),
  order: z.coerce.number().int().nonnegative().optional().default(0),
});
type WebLinkFormData = z.infer<typeof webLinkSchema>;

export default function WebLinksPage() {
  const { data: webLinks = [], isLoading } = useGetWebLinks();
  const createMutation = useCreateWebLink();
  const updateMutation = useUpdateWebLink();
  const deleteMutation = useDeleteWebLink();

  const [editingId, setEditingId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(webLinkSchema),
  });

  const onSubmit = async (data: WebLinkFormData) => {
    try {
      const payload = {
        ...data,
        order: data.order ?? 0, // Ensure order is never undefined
      };

      if (editingId) {
        await updateMutation.mutateAsync({
          webLinkId: editingId,
          data: payload,
        });
        setEditingId(null);
      } else {
        await createMutation.mutateAsync(payload);
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
    if (confirm("Are you sure you want to delete this web link?")) {
      await deleteMutation.mutateAsync(id);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    reset();
  };

  const sortedWebLinks = [...webLinks].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Manage Web Links
              </h1>
              <p className="text-gray-600 mt-2">
                Add and manage your website links
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
                {editingId ? "Edit Web Link" : "Add New Web Link"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label
                    htmlFor="title"
                    className="block text-sm font-medium mb-1"
                  >
                    Title *
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., My Portfolio"
                    {...register("title")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="url"
                    className="block text-sm font-medium mb-1"
                  >
                    URL *
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
                    htmlFor="order"
                    className="block text-sm font-medium mb-1"
                  >
                    Display Order
                  </Label>
                  <Input
                    id="order"
                    type="number"
                    min="0"
                    {...register("order", { valueAsNumber: true })}
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
                Your Web Links ({webLinks.length})
              </h2>

              {isLoading ? (
                <p className="text-gray-600">Loading web links...</p>
              ) : webLinks.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No web links yet. Add one to get started!
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedWebLinks.map((link: any) => (
                    <div
                      key={link.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition flex items-start gap-3"
                    >
                      <GripVertical className="w-4 h-4 text-gray-400 mt-1 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="flex gap-2 items-center mb-2">
                          <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                            #{link.order}
                          </span>
                        </div>
                        <p className="font-medium text-gray-800">
                          {link.title}
                        </p>
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-blue-600 hover:underline break-all"
                        >
                          {link.url}
                        </a>
                      </div>
                      <div className="flex gap-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(link)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                          disabled={
                            updateMutation.isPending || deleteMutation.isPending
                          }
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(link.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded"
                          disabled={
                            updateMutation.isPending || deleteMutation.isPending
                          }
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
