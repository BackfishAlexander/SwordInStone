import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiTags } from '@nestjs/swagger';
import { signInDto } from 'src/dtos/signInDTO';
import { registerDto } from 'src/dtos/registerDTO';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: signInDto) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('register')
    register(@Body() registerDto: registerDto) {
        return this.authService.register(registerDto.username, registerDto.password);
    }

    
}
