"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface VideoUrlProps {
  initialData?: string;
  onSave: (url: string) => Promise<void>;
}

export default function VideoUrl({ initialData = "", onSave }: VideoUrlProps) {
  const [videoUrl, setVideoUrl] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const isValidVideoUrl = (url: string) => {
    if (!url) return true; // Video URL is optional
    const youtubeRegex =
      /^(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\//;
    const vimeoRegex = /^(https?:\/\/)?(www\.)?vimeo\.com\//;
    return youtubeRegex.test(url) || vimeoRegex.test(url);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (videoUrl && !isValidVideoUrl(videoUrl)) {
      setMessage("Please enter a valid YouTube or Vimeo URL");
      return;
    }

    try {
      setLoading(true);
      await onSave(videoUrl);
      setMessage("Video URL saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Video URL</h3>

      <div>
        <label className="block text-sm font-medium mb-1">
          YouTube or Vimeo URL (Optional)
        </label>
        <input
          type="url"
          value={videoUrl}
          onChange={(e) => setVideoUrl(e.target.value)}
          placeholder="https://www.youtube.com/watch?v=..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-xs text-gray-500 mt-1">Supported: YouTube, Vimeo</p>
      </div>

      {videoUrl && (
        <div className="bg-gray-50 p-4 rounded">
          <p className="text-sm font-medium mb-2">Preview:</p>
          <a
            href={videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-blue-600 hover:underline break-all"
          >
            {videoUrl}
          </a>
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
        {loading ? "Saving..." : "Save Video URL"}
      </Button>
    </form>
  );
}
