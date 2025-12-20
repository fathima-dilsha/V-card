"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { SocialLink } from "@/interfaces/vcard";

interface SocialLinksProps {
  initialData?: SocialLink[];
  onSave: (data: SocialLink[]) => Promise<void>;
}

const PLATFORMS = [
  "Instagram",
  "Facebook",
  "LinkedIn",
  "Twitter",
  "YouTube",
  "GitHub",
  "TikTok",
  "WhatsApp",
];

export default function SocialLinks({
  initialData = [],
  onSave,
}: SocialLinksProps) {
  const [links, setLinks] = useState<SocialLink[]>(initialData);
  const [newLink, setNewLink] = useState<Omit<SocialLink, "id">>({
    platform: "Instagram",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddLink = () => {
    if (!newLink.url) {
      setMessage("Please enter a URL");
      return;
    }

    if (!isValidUrl(newLink.url)) {
      setMessage("Please enter a valid URL");
      return;
    }

    setLinks([...links, { ...newLink, id: Date.now().toString() }]);
    setNewLink({ platform: "Instagram", url: "" });
    setMessage("");
  };

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleRemoveLink = (id?: string) => {
    if (id) {
      setLinks(links.filter((l) => l.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    try {
      setLoading(true);
      await onSave(links);
      setMessage("Social links saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Social Links</h3>

      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={newLink.platform}
            onChange={(e) =>
              setNewLink({ ...newLink, platform: e.target.value })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {PLATFORMS.map((platform) => (
              <option key={platform} value={platform}>
                {platform}
              </option>
            ))}
          </select>

          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="https://example.com/profile"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            type="button"
            onClick={handleAddLink}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add
          </Button>
        </div>
      </div>

      {links.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Added Links:</h4>
          {links.map((link) => (
            <div
              key={link.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded"
            >
              <div>
                <span className="text-xs text-gray-600 font-medium">
                  {link.platform}:{" "}
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline truncate"
                >
                  {link.url}
                </a>
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveLink(link.id)}
                className="bg-red-600 hover:bg-red-700 text-white text-xs py-1 px-2"
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
      )}

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
        {loading ? "Saving..." : "Save Social Links"}
      </Button>
    </form>
  );
}
