import { IsString, MaxLength, IsOptional, IsUrl, IsInt } from 'class-validator';
import { ContactType } from '@prisma/client';

export class CreateContactDetailDto {
    @IsString()
    type: ContactType;

    @IsString()
    @MaxLength(500)
    value: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    label?: string;

    @IsOptional()
    isPrimary?: boolean;
}
