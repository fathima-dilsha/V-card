// Contact Details
export interface ContactDetailRequest {
    type: 'MOBILE' | 'EMAIL' | 'ADDRESS'
    value: string
    label?: string
    isPrimary?: boolean
}

export interface ContactDetailResponse extends ContactDetailRequest {
    id: number
    vCardId: number
    createdAt: string
    updatedAt: string
}