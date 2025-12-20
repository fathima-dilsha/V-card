"use client";

import { VCard } from "@/interfaces/vcard";

interface VCardPreviewProps {
  vcard: VCard;
}

export default function VCardPreview({ vcard }: VCardPreviewProps) {
  return (
    <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-lg shadow-lg p-8 space-y-6">
      {/* Basic Info */}
      <div className="border-b pb-6">
        <h1 className="text-3xl font-bold">{vcard.name}</h1>
        <p className="text-xl text-gray-600">{vcard.jobTitle}</p>
        <p className="text-gray-500">{vcard.companyName}</p>
      </div>

      {/* Heading & Description */}
      {(vcard.heading || vcard.description) && (
        <div className="border-b pb-6">
          {vcard.heading && (
            <h2 className="text-2xl font-semibold mb-2">{vcard.heading}</h2>
          )}
          {vcard.description && (
            <p className="text-gray-700 whitespace-pre-wrap">
              {vcard.description}
            </p>
          )}
        </div>
      )}

      {/* Contact Details */}
      {vcard.contactDetails && vcard.contactDetails.length > 0 && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-3">Contact Details</h3>
          <div className="space-y-2">
            {vcard.contactDetails.map((contact) => (
              <div key={contact.id} className="flex items-center gap-2">
                <span className="text-gray-600 font-medium capitalize">
                  {contact.type}:
                </span>
                {contact.type === "email" ? (
                  <a
                    href={`mailto:${contact.value}`}
                    className="text-blue-600 hover:underline"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <span className="text-gray-700">{contact.value}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {vcard.socialLinks && vcard.socialLinks.length > 0 && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-3">Social Links</h3>
          <div className="space-y-2">
            {vcard.socialLinks.map((link) => (
              <div key={link.id} className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  {link.platform}:
                </span>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline truncate"
                >
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Web Links */}
      {vcard.webLinks && vcard.webLinks.length > 0 && (
        <div className="border-b pb-6">
          <h3 className="text-lg font-semibold mb-3">Web Links</h3>
          <div className="space-y-3">
            {vcard.webLinks.map((link) => (
              <div key={link.id} className="bg-gray-50 p-3 rounded">
                <p className="font-medium text-gray-700">{link.title}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm break-all"
                >
                  {link.url}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Video URL */}
      {vcard.videoUrl && (
        <div>
          <h3 className="text-lg font-semibold mb-3">Video</h3>
          <a
            href={vcard.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline break-all"
          >
            Watch Video
          </a>
        </div>
      )}

      {/* Metadata */}
      {vcard.createdAt && (
        <div className="text-xs text-gray-400 border-t pt-4">
          <p>Created: {new Date(vcard.createdAt).toLocaleDateString()}</p>
          {vcard.updatedAt && (
            <p>Updated: {new Date(vcard.updatedAt).toLocaleDateString()}</p>
          )}
        </div>
      )}
    </div>
  );
}
