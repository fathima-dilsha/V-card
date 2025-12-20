import { IsString, IsUrl, MaxLength, IsOptional, IsInt, Min } from 'class-validator';

export class CreateWebLinkDto {
    @IsString()
    @MaxLength(200)
    title: string;

    @IsUrl()
    url: string;

    @IsOptional()
    @IsInt()
    @Min(0)
    order?: number;
}
