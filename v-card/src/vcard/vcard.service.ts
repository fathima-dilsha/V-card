import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
    CreateVCardDto,
    UpdateVCardDto,
    CreateContactDetailDto,
    CreateSocialLinkDto,
    CreateWebLinkDto,
} from './dto';

@Injectable()
export class VCardService {
    constructor(private prisma: PrismaService) { }

    // ========== VCard Operations ==========

    async createOrGetVCard(userId: number, createVCardDto: CreateVCardDto) {
        try {
            // Check if user already has a vCard
            const existingVCard = await this.prisma.vCard.findUnique({
                where: { userId },
            });

            if (existingVCard) {
                throw new BadRequestException('User already has a vCard');
            }

            const vCard = await this.prisma.vCard.create({
                data: {
                    userId,
                    ...createVCardDto,
                },
                include: {
                    contacts: true,
                    socialLinks: true,
                    webLinks: {
                        orderBy: { order: 'asc' },
                    },
                },
            });

            return vCard;
        } catch (error) {
            // If it's already a NestJS exception, re-throw it
            if (error instanceof BadRequestException || error instanceof NotFoundException) {
                throw error;
            }

            // Log the actual error for debugging
            console.error('Error creating vCard:', error);

            // Return a user-friendly error message
            throw new BadRequestException(
                error.message || 'Failed to create vCard. Please check your input data.'
            );
        }
    }

    async getVCard(userId: number) {
        try {
            const vCard = await this.prisma.vCard.findUnique({
                where: { userId },
                include: {
                    contacts: true,
                    socialLinks: true,
                    webLinks: {
                        orderBy: { order: 'asc' },
                    },
                },
            });

            if (!vCard) {
                throw new NotFoundException('vCard not found');
            }

            return vCard;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error fetching vCard:', error);
            throw new BadRequestException(
                error.message || 'Failed to fetch vCard'
            );
        }
    }

    async updateVCard(userId: number, updateVCardDto: UpdateVCardDto) {
        try {
            const vCard = await this.prisma.vCard.findUnique({
                where: { userId },
            });

            if (!vCard) {
                throw new NotFoundException('vCard not found');
            }

            const updatedVCard = await this.prisma.vCard.update({
                where: { userId },
                data: updateVCardDto,
                include: {
                    contacts: true,
                    socialLinks: true,
                    webLinks: {
                        orderBy: { order: 'asc' },
                    },
                },
            });

            return updatedVCard;
        } catch (error) {
            if (error instanceof NotFoundException) {
                throw error;
            }
            console.error('Error updating vCard:', error);
            throw new BadRequestException(
                error.message || 'Failed to update vCard. Please check your input data.'
            );
        }
    }

    // ========== Contact Details Operations ==========

    async addContactDetail(userId: number, createContactDto: CreateContactDetailDto) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const contact = await this.prisma.contactDetail.create({
            data: {
                vCardId: vCard.id,
                ...createContactDto,
            },
        });

        return contact;
    }

    async updateContactDetail(
        userId: number,
        contactId: number,
        updateData: Partial<CreateContactDetailDto>,
    ) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const contact = await this.prisma.contactDetail.findUnique({
            where: { id: contactId },
        });

        if (!contact || contact.vCardId !== vCard.id) {
            throw new NotFoundException('Contact detail not found');
        }

        const updatedContact = await this.prisma.contactDetail.update({
            where: { id: contactId },
            data: updateData,
        });

        return updatedContact;
    }

    async deleteContactDetail(userId: number, contactId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const contact = await this.prisma.contactDetail.findUnique({
            where: { id: contactId },
        });

        if (!contact || contact.vCardId !== vCard.id) {
            throw new NotFoundException('Contact detail not found');
        }

        await this.prisma.contactDetail.delete({
            where: { id: contactId },
        });

        return { message: 'Contact detail deleted successfully' };
    }

    async getContactDetails(userId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const contacts = await this.prisma.contactDetail.findMany({
            where: { vCardId: vCard.id },
            orderBy: { createdAt: 'desc' },
        });

        return contacts;
    }

    // ========== Social Links Operations ==========

    async addSocialLink(userId: number, createSocialLinkDto: CreateSocialLinkDto) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const socialLink = await this.prisma.socialLink.create({
            data: {
                vCardId: vCard.id,
                ...createSocialLinkDto,
            },
        });

        return socialLink;
    }

    async updateSocialLink(
        userId: number,
        socialLinkId: number,
        updateData: Partial<CreateSocialLinkDto>,
    ) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const socialLink = await this.prisma.socialLink.findUnique({
            where: { id: socialLinkId },
        });

        if (!socialLink || socialLink.vCardId !== vCard.id) {
            throw new NotFoundException('Social link not found');
        }

        const updatedLink = await this.prisma.socialLink.update({
            where: { id: socialLinkId },
            data: updateData,
        });

        return updatedLink;
    }

    async deleteSocialLink(userId: number, socialLinkId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const socialLink = await this.prisma.socialLink.findUnique({
            where: { id: socialLinkId },
        });

        if (!socialLink || socialLink.vCardId !== vCard.id) {
            throw new NotFoundException('Social link not found');
        }

        await this.prisma.socialLink.delete({
            where: { id: socialLinkId },
        });

        return { message: 'Social link deleted successfully' };
    }

    async getSocialLinks(userId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const socialLinks = await this.prisma.socialLink.findMany({
            where: { vCardId: vCard.id },
            orderBy: { createdAt: 'desc' },
        });

        return socialLinks;
    }

    // ========== Web Links Operations ==========

    async addWebLink(userId: number, createWebLinkDto: CreateWebLinkDto) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const webLink = await this.prisma.webLink.create({
            data: {
                vCardId: vCard.id,
                ...createWebLinkDto,
            },
        });

        return webLink;
    }

    async updateWebLink(
        userId: number,
        webLinkId: number,
        updateData: Partial<CreateWebLinkDto>,
    ) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const webLink = await this.prisma.webLink.findUnique({
            where: { id: webLinkId },
        });

        if (!webLink || webLink.vCardId !== vCard.id) {
            throw new NotFoundException('Web link not found');
        }

        const updatedLink = await this.prisma.webLink.update({
            where: { id: webLinkId },
            data: updateData,
        });

        return updatedLink;
    }

    async deleteWebLink(userId: number, webLinkId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const webLink = await this.prisma.webLink.findUnique({
            where: { id: webLinkId },
        });

        if (!webLink || webLink.vCardId !== vCard.id) {
            throw new NotFoundException('Web link not found');
        }

        await this.prisma.webLink.delete({
            where: { id: webLinkId },
        });

        return { message: 'Web link deleted successfully' };
    }

    async getWebLinks(userId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        const webLinks = await this.prisma.webLink.findMany({
            where: { vCardId: vCard.id },
            orderBy: { order: 'asc' },
        });

        return webLinks;
    }

    // ========== Complete vCard View ==========

    async getCompleteVCard(userId: number) {
        const vCard = await this.prisma.vCard.findUnique({
            where: { userId },
            include: {
                user: {
                    select: {
                        id: true,
                        fullName: true,
                        email: true,
                    },
                },
                contacts: {
                    orderBy: { createdAt: 'desc' },
                },
                socialLinks: {
                    orderBy: { createdAt: 'desc' },
                },
                webLinks: {
                    orderBy: { order: 'asc' },
                },
            },
        });

        if (!vCard) {
            throw new NotFoundException('vCard not found');
        }

        return vCard;
    }
}
