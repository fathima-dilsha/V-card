import { ContactDetailRequest, ContactDetailResponse } from "@/interfaces/Contact"
import axiosInstance from "@/service/axios"
import axios from "axios"

export const createContact = async (
    data: ContactDetailRequest
): Promise<ContactDetailResponse> => {
    const response = await axiosInstance.post('/vcard/contacts', data)
    return response.data
}

export const getContacts = async (): Promise<ContactDetailResponse[]> => {
    const response = await axiosInstance.get('/vcard/contacts')
    return response.data
}

export const updateContact = async (
    contactId: number,
    data: Partial<ContactDetailRequest>
): Promise<ContactDetailResponse> => {
    const response = await axiosInstance.put(`/vcard/contacts/${contactId}`, data)
    return response.data
}

export const deleteContact = async (
    contactId: number
): Promise<{ message: string }> => {
    const response = await axiosInstance.delete(`/vcard/contacts/${contactId}`)
    return response.data
}