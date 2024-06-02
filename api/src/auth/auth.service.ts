import { SigninUserDto } from './dto/signin-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) {

    }
    signIn(signinUserDto: SigninUserDto) {
        try {
            const user = this.userService.findOneByEmailAndPass(signinUserDto.email, signinUserDto.password);
            return user;
        } catch (err) {
            throw err;
        }
    }
}
