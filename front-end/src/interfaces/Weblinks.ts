// Web Links
export interface WebLinkRequest {
    title: string
    url: string
    order?: number
}

export interface WebLinkResponse extends WebLinkRequest {
    id: number
    vCardId: number
    createdAt: string
    updatedAt: string
}