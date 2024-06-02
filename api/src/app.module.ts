import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MultiloggerModule } from './multilogger/multilogger.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MultiloggerModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.local'],
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.Database, { dbName: 'eg_task' }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
