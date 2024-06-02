import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './schemas/user.schema'
import { UserUtilities } from './users.utilities';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as bcrypt from 'bcrypt';
import { MultiloggerService as Logger } from 'src/multilogger/multilogger.service';
@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');
  constructor(
    @InjectModel(User.name)
    private userModel: mongoose.Model<User>,
  ) { }
  async create(createUserDto: CreateUserDto) {
    try {
      const existUser = await this.userModel.findOne({ email: createUserDto.email }, { id: true, name: true, email: true, createdAt: true, updatedAt: true });
      if (existUser) {
        throw new ConflictException({ "message": 'Email already exists' });
      }
      createUserDto.password = await UserUtilities.hashPassowrd(createUserDto.password);
      const newUser = new this.userModel(createUserDto);
      return newUser.save();
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      if (error instanceof ConflictException) {
        throw new ConflictException({ "message": 'Email already exists' });
      } else {
        throw error;
      }
    }
  }

  async findAll(): Promise<User[]> {
    try {
      const users = await this.userModel.find({}, { id: true, name: true, email: true, createdAt: true, updatedAt: true });
      if (!users) {
        throw new NotFoundException({ "message": 'No record found' });
      } else {
        return users;
      }
    } catch (error) {
      console.log('error');
      this.logger.error(`Error retriving list ${JSON.stringify(error)}`);
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException({ "message": error.message }, HttpStatus.FORBIDDEN);
      }
    }
  }

  async findOne(id: string) {
    try {
      const user = await this.userModel.findById(id, { id: true, name: true, email: true });
      if (!user) {
        throw new NotFoundException({ "message": `User with ID ${id} not found` });
      }
      return user;
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException({ "message": error.message }, HttpStatus.FORBIDDEN);
      }
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const res = this.userModel.findByIdAndUpdate(id, updateUserDto);
    if (res) {
      return this.userModel.findById(id, { id: true, name: true, email: true });;
    } else {
      throw new HttpException({ "message": "No Content" }, HttpStatus.NO_CONTENT);
    }
  }

  async remove(id: string) {
    try {
      const res = await this.userModel.deleteOne({ _id: id });
      if (res.deletedCount) {
        return res.deletedCount;
      }
      else {
        throw new NotFoundException({ 'message': 'User not found' });
      }
    } catch (error) {
      this.logger.error(JSON.stringify(error));
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new HttpException({ 'message': 'Internal Server Error' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }

  async findOneByEmailAndPass(email: string, password: string) {
    try {
      const existUser = await this.userModel.findOne({ email: email });
      if (!existUser) {
        throw new HttpException({ 'message': 'User not found' }, HttpStatus.OK);
      }

      const isPasswordValid = await bcrypt.compare(password, existUser.password);
      if (!isPasswordValid) {
        throw new HttpException({ 'message': 'Incorrect Password' }, HttpStatus.OK);
      }

      return { id: existUser.id, email: existUser.email, name: existUser.name };
    } catch (err) {
      this.logger.error(JSON.stringify(err));
      if (err.status == HttpStatus.OK) {
        throw err;
      } else {
        throw new HttpException({ 'message': 'Internal Server Error' }, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}
