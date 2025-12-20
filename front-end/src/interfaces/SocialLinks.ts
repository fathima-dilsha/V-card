// Social Links
export interface SocialLinkRequest {
    platform:
    | 'INSTAGRAM'
    | 'FACEBOOK'
    | 'LINKEDIN'
    | 'TWITTER'
    | 'YOUTUBE'
    | 'TIKTOK'
    | 'GITHUB'
    | 'PINTEREST'
    | 'SNAPCHAT'
    | 'WHATSAPP'
    | 'TELEGRAM'
    | 'OTHER'
    url: string
    username?: string
}

export interface SocialLinkResponse extends SocialLinkRequest {
    id: number
    vCardId: number
    createdAt: string
    updatedAt: string
}