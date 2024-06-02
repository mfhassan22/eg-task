import { Body, Controller, Get, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private jwtService: JwtService, private authService: AuthService) { }

  @Post('login')
  async login(@Body() signinUserDto: SigninUserDto, @Res({ passthrough: true }) res) {
    const user = await this.authService.signIn(signinUserDto);
    if (user) {
      const payload = { email: user.email, id: user.id }
      res.cookie('user_token', this.jwtService.sign(payload, { secret: process.env.JWT_SECRET }), {
        expires: new Date(Date.now() + 3600000),
      });
      res.status(HttpStatus.OK).send({ "_id": user.id, "name": user.name, "email": user.email });
    } else {
      res.status(HttpStatus.OK).send({});
    }
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  async logout(@Res({ passthrough: true }) res) {
    res.cookie('user_token', '', { expires: new Date(Date.now()) });
    return {};
  }
}