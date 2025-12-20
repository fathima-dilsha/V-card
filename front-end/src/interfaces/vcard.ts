import { ContactDetailResponse } from "./Contact"
import { SocialLinkResponse } from "./SocialLinks"
import { WebLinkResponse } from "./Weblinks"

export interface CreateVCardRequest {
    name: string
    jobTitle?: string
    companyName?: string
    heading?: string
    description?: string
    videoUrl?: string
}

export interface VCardResponse {
    id: number
    userId: number
    name: string
    jobTitle?: string
    companyName?: string
    heading?: string
    description?: string
    videoUrl?: string
    createdAt: string
    updatedAt: string
    contacts?: ContactDetailResponse[]
    socialLinks?: SocialLinkResponse[]
    webLinks?: WebLinkResponse[]
}

export interface UpdateVCardRequest {
    name?: string
    jobTitle?: string
    companyName?: string
    heading?: string
    description?: string
    videoUrl?: string
}



export interface ContactDetail {
    id?: string;
    type: "mobile" | "email" | "address";
    value: string;
}

export interface SocialLink {
    id?: string;
    platform: string;
    url: string;
}

export interface WebLink {
    id?: string;
    title: string;
    url: string;
}

export interface VCard {
    id?: string;
    userId: string;
    name: string;
    jobTitle: string;
    companyName: string;
    heading: string;
    description: string;
    contactDetails: ContactDetail[];
    socialLinks: SocialLink[];
    webLinks: WebLink[];
    videoUrl?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface User {
    id: string;
    fullName: string;
    email: string;
    vCard?: VCard;
}
