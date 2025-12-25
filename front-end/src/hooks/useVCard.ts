import { createContact, deleteContact, getContacts, updateContact } from '@/api/Contact/api'
import { createSocialLink, deleteSocialLink, getSocialLinks, updateSocialLink } from '@/api/socialLinks/api'
import { createVCard, getCompleteVCard, getVCard, updateVCard } from '@/api/vCard/api'
import { createWebLink, deleteWebLink, getWebLinks, updateWebLink } from '@/api/webLink/api'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { toast } from 'sonner'

const VCARD_KEY = 'vcard'
const CONTACTS_KEY = 'contacts'
const SOCIAL_LINKS_KEY = 'socialLinks'
const WEB_LINKS_KEY = 'webLinks'

// vCard Queries
export const useGetVCard = () => {
    return useQuery({
        queryKey: [VCARD_KEY],
        queryFn: getVCard,
        retry: 1,
    })
}

export const useGetCompleteVCard = () => {
    return useQuery({
        queryKey: [VCARD_KEY, 'complete'],
        queryFn: getCompleteVCard,
        retry: 1,
    })
}

// vCard Mutations
export const useCreateVCard = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createVCard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('vCard created successfully!')
        },
        onError: (error: any) => {
            toast.error(error.message || error.response?.data?.message || 'Failed to create vCard')
        },
    })
}

export const useUpdateVCard = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateVCard,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('vCard updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update vCard')
        },
    })
}

// Contact Queries
export const useGetContacts = () => {
    return useQuery({
        queryKey: [CONTACTS_KEY],
        queryFn: getContacts,
        retry: 1,
    })
}

// Contact Mutations
export const useCreateContact = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Contact added successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add contact')
        },
    })
}

export const useUpdateContact = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ contactId, data }: any) => updateContact(contactId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Contact updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update contact')
        },
    })
}

export const useDeleteContact = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteContact,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [CONTACTS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Contact deleted successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete contact')
        },
    })
}

// Social Links Queries
export const useGetSocialLinks = () => {
    return useQuery({
        queryKey: [SOCIAL_LINKS_KEY],
        queryFn: getSocialLinks,
        retry: 1,
    })
}

// Social Links Mutations
export const useCreateSocialLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createSocialLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SOCIAL_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Social link added successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add social link')
        },
    })
}

export const useUpdateSocialLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ socialLinkId, data }: any) =>
            updateSocialLink(socialLinkId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SOCIAL_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Social link updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update social link')
        },
    })
}

export const useDeleteSocialLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteSocialLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [SOCIAL_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Social link deleted successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete social link')
        },
    })
}

// Web Links Queries
export const useGetWebLinks = () => {
    return useQuery({
        queryKey: [WEB_LINKS_KEY],
        queryFn: getWebLinks,
        retry: 1,
    })
}

// Web Links Mutations
export const useCreateWebLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createWebLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [WEB_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Web link added successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add web link')
        },
    })
}

export const useUpdateWebLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({ webLinkId, data }: any) => updateWebLink(webLinkId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [WEB_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Web link updated successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to update web link')
        },
    })
}

export const useDeleteWebLink = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteWebLink,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [WEB_LINKS_KEY] })
            queryClient.invalidateQueries({ queryKey: [VCARD_KEY] })
            toast.success('Web link deleted successfully!')
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to delete web link')
        },
    })
}
