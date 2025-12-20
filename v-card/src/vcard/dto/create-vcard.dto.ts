import { IsString, MaxLength, IsOptional, IsUrl } from 'class-validator';

export class CreateVCardDto {
    @IsString()
    @MaxLength(100)
    name: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    jobTitle?: string;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    companyName?: string;

    @IsOptional()
    @IsString()
    @MaxLength(255)
    heading?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsUrl()
    videoUrl?: string;
}
