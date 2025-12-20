import { IsString, IsUrl, IsOptional, MaxLength } from 'class-validator';
import { SocialPlatform } from '@prisma/client';

export class CreateSocialLinkDto {
    @IsString()
    platform: SocialPlatform;

    @IsUrl()
    url: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    username?: string;
}
