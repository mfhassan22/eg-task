import { Module } from '@nestjs/common';
import { MultiloggerService } from './multilogger.service';

@Module({
    providers: [MultiloggerService],
    exports: [MultiloggerService],
})
export class MultiloggerModule { }
