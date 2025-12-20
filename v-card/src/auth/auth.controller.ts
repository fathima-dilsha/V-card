import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('register')
    @HttpCode(HttpStatus.CREATED)
    async register(@Body() registerDto: RegisterDto) {
        return this.authService.register(registerDto);
    }

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }

    @Post('logout')
    @HttpCode(HttpStatus.OK)
    async logout(@Headers('authorization') authHeader: string) {
        const token = authHeader?.replace('Bearer ', '');
        if (!token) {
            throw new Error('No token provided');
        }
        return this.authService.logout(token);
    }
}
