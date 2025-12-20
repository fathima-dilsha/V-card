import {
    Controller,
    Post,
    Get,
    Put,
    Delete,
    Body,
    Param,
    Headers,
    HttpCode,
    HttpStatus,
    ParseIntPipe,
} from '@nestjs/common';
import { VCardService } from './vcard.service';
import { AuthService } from '../auth/auth.service';
import {
    CreateVCardDto,
    UpdateVCardDto,
    CreateContactDetailDto,
    CreateSocialLinkDto,
    CreateWebLinkDto,
} from './dto';

@Controller('vcard')
export class VCardController {
    constructor(
        private vCardService: VCardService,
        private authService: AuthService,
    ) { }

    private async getUserId(authHeader: string): Promise<number> {
        const token = authHeader?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        const user = await this.authService.validateToken(token);
        return user.id;
    }

    // ========== VCard CRUD ==========

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async createVCard(
        @Body() createVCardDto: CreateVCardDto,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.createOrGetVCard(userId, createVCardDto);
    }

    @Get()
    async getVCard(@Headers('authorization') authHeader: string) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.getVCard(userId);
    }

    @Put()
    async updateVCard(
        @Body() updateVCardDto: UpdateVCardDto,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.updateVCard(userId, updateVCardDto);
    }

    @Get('complete')
    async getCompleteVCard(@Headers('authorization') authHeader: string) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.getCompleteVCard(userId);
    }

    // ========== Contact Details ==========

    @Post('contacts')
    @HttpCode(HttpStatus.CREATED)
    async addContact(
        @Body() createContactDto: CreateContactDetailDto,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.addContactDetail(userId, createContactDto);
    }

    @Get('contacts')
    async getContacts(@Headers('authorization') authHeader: string) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.getContactDetails(userId);
    }

    @Put('contacts/:contactId')
    async updateContact(
        @Param('contactId', ParseIntPipe) contactId: number,
        @Body() updateData: Partial<CreateContactDetailDto>,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.updateContactDetail(userId, contactId, updateData);
    }

    @Delete('contacts/:contactId')
    async deleteContact(
        @Param('contactId', ParseIntPipe) contactId: number,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.deleteContactDetail(userId, contactId);
    }

    // ========== Social Links ==========

    @Post('social-links')
    @HttpCode(HttpStatus.CREATED)
    async addSocialLink(
        @Body() createSocialLinkDto: CreateSocialLinkDto,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.addSocialLink(userId, createSocialLinkDto);
    }

    @Get('social-links')
    async getSocialLinks(@Headers('authorization') authHeader: string) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.getSocialLinks(userId);
    }

    @Put('social-links/:socialLinkId')
    async updateSocialLink(
        @Param('socialLinkId', ParseIntPipe) socialLinkId: number,
        @Body() updateData: Partial<CreateSocialLinkDto>,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.updateSocialLink(userId, socialLinkId, updateData);
    }

    @Delete('social-links/:socialLinkId')
    async deleteSocialLink(
        @Param('socialLinkId', ParseIntPipe) socialLinkId: number,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.deleteSocialLink(userId, socialLinkId);
    }

    // ========== Web Links ==========

    @Post('web-links')
    @HttpCode(HttpStatus.CREATED)
    async addWebLink(
        @Body() createWebLinkDto: CreateWebLinkDto,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.addWebLink(userId, createWebLinkDto);
    }

    @Get('web-links')
    async getWebLinks(@Headers('authorization') authHeader: string) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.getWebLinks(userId);
    }

    @Put('web-links/:webLinkId')
    async updateWebLink(
        @Param('webLinkId', ParseIntPipe) webLinkId: number,
        @Body() updateData: Partial<CreateWebLinkDto>,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.updateWebLink(userId, webLinkId, updateData);
    }

    @Delete('web-links/:webLinkId')
    async deleteWebLink(
        @Param('webLinkId', ParseIntPipe) webLinkId: number,
        @Headers('authorization') authHeader: string,
    ) {
        const userId = await this.getUserId(authHeader);
        return this.vCardService.deleteWebLink(userId, webLinkId);
    }
}
