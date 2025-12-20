"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  useGetContacts,
  useCreateContact,
  useUpdateContact,
  useDeleteContact,
} from "@/hooks/useVCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { Trash2, Edit2, Plus } from "lucide-react";

const contactSchema = z.object({
  type: z.enum(["MOBILE", "EMAIL", "ADDRESS"]),
  value: z.string().min(1, "Value is required"),
  label: z.string().optional(),
  isPrimary: z.boolean().default(false),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactsPage() {
  const { data: contacts = [], isLoading } = useGetContacts();
  const createMutation = useCreateContact();
  const updateMutation = useUpdateContact();
  const deleteMutation = useDeleteContact();

  const [editingId, setEditingId] = useState<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      type: "MOBILE",
      isPrimary: false,
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      if (editingId) {
        await updateMutation.mutateAsync({
          contactId: editingId,
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

  const handleEdit = (contact: any) => {
    setEditingId(contact.id);
    reset(contact);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this contact?")) {
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
                Manage Contacts
              </h1>
              <p className="text-gray-600 mt-2">
                Add and manage your contact details
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
                {editingId ? "Edit Contact" : "Add New Contact"}
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <Label
                    htmlFor="type"
                    className="block text-sm font-medium mb-1"
                  >
                    Type *
                  </Label>
                  <select
                    id="type"
                    {...register("type")}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  >
                    <option value="MOBILE">Mobile</option>
                    <option value="EMAIL">Email</option>
                    <option value="ADDRESS">Address</option>
                  </select>
                </div>

                <div>
                  <Label
                    htmlFor="value"
                    className="block text-sm font-medium mb-1"
                  >
                    Value *
                  </Label>
                  <Input
                    id="value"
                    placeholder="Enter contact value"
                    {...register("value")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                  {errors.value && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.value.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label
                    htmlFor="label"
                    className="block text-sm font-medium mb-1"
                  >
                    Label
                  </Label>
                  <Input
                    id="label"
                    placeholder="e.g., Work, Personal"
                    {...register("label")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isPrimary"
                    {...register("isPrimary")}
                    disabled={
                      createMutation.isPending || updateMutation.isPending
                    }
                  />
                  <Label
                    htmlFor="isPrimary"
                    className="text-sm font-medium mb-0"
                  >
                    Set as primary
                  </Label>
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
                Your Contacts ({contacts.length})
              </h2>

              {isLoading ? (
                <p className="text-gray-600">Loading contacts...</p>
              ) : contacts.length === 0 ? (
                <p className="text-gray-600 text-center py-8">
                  No contacts yet. Add one to get started!
                </p>
              ) : (
                <div className="space-y-3">
                  {contacts.map((contact: any) => (
                    <div
                      key={contact.id}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-md transition"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex gap-2 items-center">
                            <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                              {contact.type}
                            </span>
                            {contact.isPrimary && (
                              <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                                Primary
                              </span>
                            )}
                          </div>
                          <p className="mt-2 font-medium text-gray-800">
                            {contact.value}
                          </p>
                          {contact.label && (
                            <p className="text-sm text-gray-600">
                              {contact.label}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(contact)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded"
                            disabled={
                              updateMutation.isPending ||
                              deleteMutation.isPending
                            }
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(contact.id)}
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
