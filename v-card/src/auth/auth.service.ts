import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto, LoginDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) { }

    async register(registerDto: RegisterDto) {
        const { fullName, email, password } = registerDto;

        // Check if user already exists
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });

        if (existingUser) {
            throw new BadRequestException('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        const user = await this.prisma.user.create({
            data: {
                fullName,
                email,
                password: hashedPassword,
            },
            select: {
                id: true,
                fullName: true,
                email: true,
                createdAt: true,
            },
        });

        return user;
    }

    async login(loginDto: LoginDto) {
        const { email, password } = loginDto;

        // Find user
        const user = await this.prisma.user.findUnique({
            where: { email },
        });

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Check password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate token (simple UUID-based token)
        const token = uuidv4();
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days

        // Create session
        await this.prisma.session.create({
            data: {
                userId: user.id,
                token,
                expiresAt,
            },
        });

        return {
            id: user.id,
            fullName: user.fullName,
            email: user.email,
            token,
            expiresAt,
        };
    }

    async validateToken(token: string) {
        const session = await this.prisma.session.findUnique({
            where: { token },
            include: { user: true },
        });

        if (!session || session.expiresAt < new Date()) {
            throw new UnauthorizedException('Invalid or expired token');
        }

        return session.user;
    }

    async logout(token: string) {
        await this.prisma.session.delete({
            where: { token },
        });

        return { message: 'Logged out successfully' };
    }
}
