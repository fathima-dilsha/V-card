import { WebLinkRequest, WebLinkResponse } from "@/interfaces/Weblinks"
import axiosInstance from "@/service/axios"

export const createWebLink = async (
    data: WebLinkRequest
): Promise<WebLinkResponse> => {
    const response = await axiosInstance.post('/vcard/web-links', data)
    return response.data
}

export const getWebLinks = async (): Promise<WebLinkResponse[]> => {
    const response = await axiosInstance.get('/vcard/web-links')
    return response.data
}

export const updateWebLink = async (
    webLinkId: number,
    data: Partial<WebLinkRequest>
): Promise<WebLinkResponse> => {
    const response = await axiosInstance.put(`/vcard/web-links/${webLinkId}`, data)
    return response.data
}

export const deleteWebLink = async (
    webLinkId: number
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/vcard/web-links/${webLinkId}`)
    return response.data
}