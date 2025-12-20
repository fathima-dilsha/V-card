import axiosInstance from "@/service/axios"

export interface RegisterRequest {
    fullName: string
    email: string
    password: string
}

export interface RegisterResponse {
    id: number
    fullName: string
    email: string
    createdAt: string
}

export const registerUser = async (
    data: RegisterRequest
): Promise<RegisterResponse> => {
    const response = await axiosInstance.post('/auth/register', data)
    return response.data
}

export interface LoginRequest {
    email: string
    password: string
}

export interface LoginResponse {
    id: number
    fullName: string
    email: string
    token: string
    expiresAt: string
}

export const loginUser = async (
    data: LoginRequest
): Promise<LoginResponse> => {
    const response = await axiosInstance.post('/auth/login', data)
    return response.data
}

export const logoutUser = async (): Promise<{ message: string }> => {
    const response = await axiosInstance.post('/auth/logout')
    return response.data
}
