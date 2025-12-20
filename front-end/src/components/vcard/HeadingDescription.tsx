"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HeadingDescriptionProps {
  initialData?: {
    heading: string;
    description: string;
  };
  onSave: (data: { heading: string; description: string }) => Promise<void>;
}

export default function HeadingDescription({
  initialData,
  onSave,
}: HeadingDescriptionProps) {
  const [formData, setFormData] = useState({
    heading: initialData?.heading || "",
    description: initialData?.description || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.heading || !formData.description) {
      setMessage("All fields are required");
      return;
    }

    try {
      setLoading(true);
      await onSave(formData);
      setMessage("Saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Heading & Description</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Heading</label>
        <input
          type="text"
          name="heading"
          value={formData.heading}
          onChange={handleChange}
          placeholder="Enter a short heading"
          maxLength={100}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.heading.length}/100 characters
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter a detailed description"
          rows={6}
          maxLength={500}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          {formData.description.length}/500 characters
        </p>
      </div>

      {message && (
        <div
          className={`text-sm ${
            message.includes("success") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </div>
      )}

      <Button
        type="submit"
        disabled={loading}
        className="bg-blue-600 hover:bg-blue-700 text-white"
      >
        {loading ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
