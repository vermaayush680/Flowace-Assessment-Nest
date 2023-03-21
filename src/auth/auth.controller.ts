import { Controller, Request, Post, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('auth/login')
    async login(email: string) {
        return this.authService.login(email);
    }
}