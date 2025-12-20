import { SocialLinkRequest, SocialLinkResponse } from "@/interfaces/SocialLinks"
import axiosInstance from "@/service/axios"

export const createSocialLink = async (
    data: SocialLinkRequest
): Promise<SocialLinkResponse> => {
    const response = await axiosInstance.post('/vcard/social-links', data)
    return response.data
}

export const getSocialLinks = async (): Promise<SocialLinkResponse[]> => {
    const response = await axiosInstance.get('/vcard/social-links')
    return response.data
}

export const updateSocialLink = async (
    socialLinkId: number,
    data: Partial<SocialLinkRequest>
): Promise<SocialLinkResponse> => {
    const response = await axiosInstance.put(`/vcard/social-links/${socialLinkId}`, data)
    return response.data
}

export const deleteSocialLink = async (
    socialLinkId: number
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/vcard/social-links/${socialLinkId}`)
    return response.data
}
