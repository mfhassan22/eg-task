import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtGuard } from 'src/auth/guards';
import { MultiloggerService as Logger } from 'src/multilogger/multilogger.service';

@Controller('users')
export class UsersController {
  private logger = new Logger('UsersController');
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.logger.verbose(`Create user ${JSON.stringify(createUserDto)}`);
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    this.logger.verbose(`Get all users list`);
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtGuard)
  findOne(@Param('id') id: string) {
    this.logger.verbose(`Find user by Id ${id}`);
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtGuard)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    this.logger.verbose(`Update user by Id ${id}`);
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtGuard)
  async removeOne(@Param('id') id: string) {
    this.logger.verbose(`Delete user by Id ${id}`);
    return await this.usersService.remove(id);
  }
}
