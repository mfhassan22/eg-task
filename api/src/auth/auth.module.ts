import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.startegy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt', session: false }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: '1h' }
        }),
        UsersModule
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController]
})
export class AuthModule { }
