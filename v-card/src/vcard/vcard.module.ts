import { Module } from '@nestjs/common';
import { VCardService } from './vcard.service';
import { VCardController } from './vcard.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [VCardController],
    providers: [VCardService],
})
export class VCardModule { }
