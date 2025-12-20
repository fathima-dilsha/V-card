"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface BasicInfoProps {
  initialData?: {
    name: string;
    jobTitle: string;
    companyName: string;
  };
  onSave: (data: {
    name: string;
    jobTitle: string;
    companyName: string;
  }) => Promise<void>;
}

export default function BasicInfo({ initialData, onSave }: BasicInfoProps) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    jobTitle: initialData?.jobTitle || "",
    companyName: initialData?.companyName || "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (!formData.name || !formData.jobTitle || !formData.companyName) {
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
      <h3 className="text-lg font-semibold">Basic Information</h3>

      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter your name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Job Title</label>
        <input
          type="text"
          name="jobTitle"
          value={formData.jobTitle}
          onChange={handleChange}
          placeholder="Enter job title"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Company Name</label>
        <input
          type="text"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
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
