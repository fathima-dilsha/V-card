"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { WebLink } from "@/interfaces/vcard";

interface WebLinksProps {
  initialData?: WebLink[];
  onSave: (data: WebLink[]) => Promise<void>;
}

export default function WebLinks({ initialData = [], onSave }: WebLinksProps) {
  const [links, setLinks] = useState<WebLink[]>(initialData);
  const [newLink, setNewLink] = useState<Omit<WebLink, "id">>({
    title: "",
    url: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddLink = () => {
    if (!newLink.title || !newLink.url) {
      setMessage("Please enter title and URL");
      return;
    }

    if (!isValidUrl(newLink.url)) {
      setMessage("Please enter a valid URL");
      return;
    }

    setLinks([...links, { ...newLink, id: Date.now().toString() }]);
    setNewLink({ title: "", url: "" });
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
      setMessage("Web links saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Web Links</h3>

      <div className="space-y-3">
        <input
          type="text"
          value={newLink.title}
          onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
          placeholder="Link title (e.g., My Blog, Portfolio)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex gap-2">
          <input
            type="url"
            value={newLink.url}
            onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
            placeholder="https://example.com"
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
                <p className="text-sm font-medium">{link.title}</p>
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
        {loading ? "Saving..." : "Save Web Links"}
      </Button>
    </form>
  );
}
