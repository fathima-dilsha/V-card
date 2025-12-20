import { VCard } from "@/interfaces/vcard";
import VCardPreview from "@/components/vcard/VCardPreview";

// TODO: Fetch vCard by ID from your API
const mockVCard: VCard = {
  id: "1",
  userId: "user1",
  name: "John Doe",
  jobTitle: "Full Stack Developer",
  companyName: "Tech Company",
  heading: "Creating amazing digital experiences",
  description:
    "Passionate developer with expertise in React, Node.js, and modern web technologies.",
  contactDetails: [
    { id: "1", type: "mobile", value: "+1 (555) 123-4567" },
    { id: "2", type: "email", value: "john@example.com" },
    { id: "3", type: "address", value: "San Francisco, CA" },
  ],
  socialLinks: [
    {
      id: "1",
      platform: "LinkedIn",
      url: "https://linkedin.com/in/johndoe",
    },
    { id: "2", platform: "GitHub", url: "https://github.com/johndoe" },
    {
      id: "3",
      platform: "Twitter",
      url: "https://twitter.com/johndoe",
    },
  ],
  webLinks: [
    { id: "1", title: "My Blog", url: "https://johnblog.com" },
    { id: "2", title: "Portfolio", url: "https://johnportfolio.com" },
  ],
  videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

interface VCardViewPageProps {
  params: {
    id: string;
  };
}

export default function VCardViewPage({ params }: VCardViewPageProps) {
  // TODO: Fetch vCard by params.id from your API

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <VCardPreview vcard={mockVCard} />
      </div>
    </div>
  );
}
