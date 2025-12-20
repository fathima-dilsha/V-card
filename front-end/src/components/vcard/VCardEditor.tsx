"use client";

import { useState } from "react";
import BasicInfo from "@/components/vcard/BasicInfo";
import HeadingDescription from "@/components/vcard/HeadingDescription";
import ContactDetails from "@/components/vcard/ContactDetails";
import SocialLinks from "@/components/vcard/SocialLinks";
import WebLinks from "@/components/vcard/WebLinks";
import VideoUrl from "@/components/vcard/VideoUrl";
import VCardPreview from "@/components/vcard/VCardPreview";
import { VCard } from "@/interfaces/vcard";

interface VCardEditorProps {
  initialVCard?: VCard;
}

export default function VCardEditor({ initialVCard }: VCardEditorProps) {
  const [vcard, setVCard] = useState<VCard>(
    initialVCard || {
      userId: "",
      name: "",
      jobTitle: "",
      companyName: "",
      heading: "",
      description: "",
      contactDetails: [],
      socialLinks: [],
      webLinks: [],
      videoUrl: "",
    }
  );

  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");

  const handleBasicInfoSave = async (data: any) => {
    setVCard((prev) => ({ ...prev, ...data }));
  };

  const handleHeadingDescriptionSave = async (data: any) => {
    setVCard((prev) => ({ ...prev, ...data }));
  };

  const handleContactDetailsSave = async (data: any) => {
    setVCard((prev) => ({ ...prev, contactDetails: data }));
  };

  const handleSocialLinksSave = async (data: any) => {
    setVCard((prev) => ({ ...prev, socialLinks: data }));
  };

  const handleWebLinksSave = async (data: any) => {
    setVCard((prev) => ({ ...prev, webLinks: data }));
  };

  const handleVideoUrlSave = async (url: string) => {
    setVCard((prev) => ({ ...prev, videoUrl: url }));
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="flex gap-4 border-b">
        <button
          onClick={() => setActiveTab("edit")}
          className={`px-4 py-2 font-medium ${
            activeTab === "edit"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Edit vCard
        </button>
        <button
          onClick={() => setActiveTab("preview")}
          className={`px-4 py-2 font-medium ${
            activeTab === "preview"
              ? "border-b-2 border-blue-600 text-blue-600"
              : "text-gray-600"
          }`}
        >
          Preview
        </button>
      </div>

      {/* Edit Tab */}
      {activeTab === "edit" && (
        <div className="space-y-8 max-w-2xl">
          <BasicInfo
            initialData={{
              name: vcard.name,
              jobTitle: vcard.jobTitle,
              companyName: vcard.companyName,
            }}
            onSave={handleBasicInfoSave}
          />

          <div className="border-t pt-8">
            <HeadingDescription
              initialData={{
                heading: vcard.heading,
                description: vcard.description,
              }}
              onSave={handleHeadingDescriptionSave}
            />
          </div>

          <div className="border-t pt-8">
            <ContactDetails
              initialData={vcard.contactDetails}
              onSave={handleContactDetailsSave}
            />
          </div>

          <div className="border-t pt-8">
            <SocialLinks
              initialData={vcard.socialLinks}
              onSave={handleSocialLinksSave}
            />
          </div>

          <div className="border-t pt-8">
            <WebLinks
              initialData={vcard.webLinks}
              onSave={handleWebLinksSave}
            />
          </div>

          <div className="border-t pt-8">
            <VideoUrl
              initialData={vcard.videoUrl}
              onSave={handleVideoUrlSave}
            />
          </div>
        </div>
      )}

      {/* Preview Tab */}
      {activeTab === "preview" && (
        <div className="py-8">
          <VCardPreview vcard={vcard} />
        </div>
      )}
    </div>
  );
}
