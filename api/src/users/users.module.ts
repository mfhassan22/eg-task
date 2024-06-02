import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { MultiloggerModule } from 'src/multilogger/multilogger.module';
import { MultiloggerService } from 'src/multilogger/multilogger.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]), MultiloggerModule],
  exports: [UsersService],
  controllers: [UsersController],
  providers: [UsersService, MultiloggerService],
})
export class UsersModule { }
