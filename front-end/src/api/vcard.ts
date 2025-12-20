// API service for vCard operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

// Helper function to get authentication headers
const getAuthHeaders = () => {
    const token = localStorage.getItem("auth_token");
    console.log("🔑 Token from localStorage:", token ? `${token.substring(0, 20)}...` : "NO TOKEN FOUND");

    if (!token) {
        console.error("❌ No auth token found in localStorage. Please login first!");
    }

    return {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
    };
};

export const vCardApi = {
    // User Authentication
    register: async (data: {
        fullName: string;
        email: string;
        password: string;
    }) => {
        const response = await fetch(`${API_BASE_URL}/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Registration failed");
        return response.json();
    },

    login: async (data: { email: string; password: string }) => {
        const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Login failed");
        return response.json();
    },

    logout: async () => {
        const response = await fetch(`${API_BASE_URL}/auth/logout`, {
            method: "POST",
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Logout failed");
        return response.json();
    },

    // vCard Operations
    getMyVCard: async () => {
        const response = await fetch(`${API_BASE_URL}/vcard/me`, {
            headers: getAuthHeaders(),
        });
        if (!response.ok) throw new Error("Failed to fetch vCard");
        return response.json();
    },

    getVCardById: async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/vcard/${id}`);
        if (!response.ok) throw new Error("Failed to fetch vCard");
        return response.json();
    },

    createVCard: async (data: any) => {
        const token = localStorage.getItem("auth_token");

        if (!token) {
            throw new Error("Please login first to create a vCard");
        }

        const response = await fetch(`${API_BASE_URL}/vcard`, {
            method: "POST",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || "Failed to create vCard");
        }

        return response.json();
    },

    updateVCard: async (id: string, data: any) => {
        const response = await fetch(`${API_BASE_URL}/vcard/${id}`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update vCard");
        return response.json();
    },

    updateBasicInfo: async (data: any) => {
        const response = await fetch(`${API_BASE_URL}/vcard/basic-info`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error("Failed to update basic info");
        return response.json();
    },

    updateContactDetails: async (contactDetails: any[]) => {
        const response = await fetch(`${API_BASE_URL}/vcard/contact-details`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ contactDetails }),
        });
        if (!response.ok) throw new Error("Failed to update contact details");
        return response.json();
    },

    updateSocialLinks: async (socialLinks: any[]) => {
        const response = await fetch(`${API_BASE_URL}/vcard/social-links`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ socialLinks }),
        });
        if (!response.ok) throw new Error("Failed to update social links");
        return response.json();
    },

    updateWebLinks: async (webLinks: any[]) => {
        const response = await fetch(`${API_BASE_URL}/vcard/web-links`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ webLinks }),
        });
        if (!response.ok) throw new Error("Failed to update web links");
        return response.json();
    },

    updateVideoUrl: async (videoUrl: string) => {
        const response = await fetch(`${API_BASE_URL}/vcard/video-url`, {
            method: "PUT",
            headers: getAuthHeaders(),
            body: JSON.stringify({ videoUrl }),
        });
        if (!response.ok) throw new Error("Failed to update video URL");
        return response.json();
    },
};
