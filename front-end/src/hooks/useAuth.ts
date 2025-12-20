import { useMutation } from '@tanstack/react-query'
import { registerUser, loginUser, logoutUser } from '@/api/Login/authService'
import { useRouter } from 'next/navigation'
import { LocalStorage } from '@/utility/LocalStorage'
import { toast } from 'sonner'

export const useRegister = () => {
    return useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            toast.success('Registration successful! Please login.')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Registration failed')
        },
    })
}

export const useLogin = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            LocalStorage.setItem('auth_token', data.token)
            LocalStorage.setItem('user', {
                id: data.id,
                fullName: data.fullName,
                email: data.email,
            })
            toast.success('Login successful!')
            router.push('/dashboard')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Login failed')
        },
    })
}

export const useLogout = () => {
    const router = useRouter()

    return useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            LocalStorage.removeItem('auth_token')
            LocalStorage.removeItem('user')
            toast.success('Logged out successfully')
            router.push('/login')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Logout failed')
        },
    })
}
