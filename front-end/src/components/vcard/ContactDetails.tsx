"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ContactDetail } from "@/interfaces/vcard";

interface ContactDetailsProps {
  initialData?: ContactDetail[];
  onSave: (data: ContactDetail[]) => Promise<void>;
}

export default function ContactDetails({
  initialData = [],
  onSave,
}: ContactDetailsProps) {
  const [contacts, setContacts] = useState<ContactDetail[]>(initialData);
  const [newContact, setNewContact] = useState<Omit<ContactDetail, "id">>({
    type: "mobile",
    value: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddContact = () => {
    if (!newContact.value) {
      setMessage("Please enter a value");
      return;
    }

    setContacts([...contacts, { ...newContact, id: Date.now().toString() }]);
    setNewContact({ type: "mobile", value: "" });
    setMessage("");
  };

  const handleRemoveContact = (id?: string) => {
    if (id) {
      setContacts(contacts.filter((c) => c.id !== id));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    if (contacts.length === 0) {
      setMessage("Please add at least one contact");
      return;
    }

    try {
      setLoading(true);
      await onSave(contacts);
      setMessage("Contacts saved successfully!");
    } catch (err: any) {
      setMessage(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-lg font-semibold">Contact Details</h3>

      <div className="space-y-3">
        <div className="flex gap-2">
          <select
            value={newContact.type}
            onChange={(e) =>
              setNewContact({
                ...newContact,
                type: e.target.value as "mobile" | "email" | "address",
              })
            }
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="mobile">Mobile</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </select>

          <input
            type="text"
            value={newContact.value}
            onChange={(e) =>
              setNewContact({ ...newContact, value: e.target.value })
            }
            placeholder={`Enter ${newContact.type}`}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <Button
            type="button"
            onClick={handleAddContact}
            className="bg-green-600 hover:bg-green-700 text-white"
          >
            Add
          </Button>
        </div>
      </div>

      {contacts.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Added Contacts:</h4>
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className="flex justify-between items-center bg-gray-50 p-2 rounded"
            >
              <div>
                <span className="text-xs text-gray-600 capitalize">
                  {contact.type}:{" "}
                </span>
                <span className="text-sm">{contact.value}</span>
              </div>
              <Button
                type="button"
                onClick={() => handleRemoveContact(contact.id)}
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
        {loading ? "Saving..." : "Save Contacts"}
      </Button>
    </form>
  );
}
