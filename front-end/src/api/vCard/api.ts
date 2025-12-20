import { CreateVCardRequest, UpdateVCardRequest, VCardResponse } from "@/interfaces/vcard"
import axiosInstance from "@/service/axios"

export const createVCard = async (
    data: CreateVCardRequest
): Promise<VCardResponse> => {
    const response = await axiosInstance.post('/vcard', data)
    return response.data
}

export const getVCard = async (): Promise<VCardResponse> => {
    const response = await axiosInstance.get('/vcard')
    return response.data
}

export const updateVCard = async (
    data: UpdateVCardRequest
): Promise<VCardResponse> => {
    const response = await axiosInstance.put('/vcard', data)
    return response.data
}

export const getCompleteVCard = async (): Promise<VCardResponse & { user: any }> => {
    const response = await axiosInstance.get('/vcard/complete')
    return response.data
}