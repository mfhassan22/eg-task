import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MultiloggerService extends Logger {
    private readonly logFilePath: string;
    constructor(context?: string) {
        super(context);
        this.logFilePath = path.join(__dirname, '../../..', 'log', 'api.log');
        fs.mkdirSync(path.dirname(this.logFilePath), { recursive: true });
    }

    log(message: string, context?: string) {
        super.log(message, context);
        this.logToFile(`[LOG] ${this.context ? '[' + this.context + '] ' : ''}${message}`);
    }

    error(message: string, trace?: string, context?: string) {
        super.error(message, context);
        this.logToFile(`[ERROR] ${this.context ? '[' + this.context + '] ' : ''}${message} ${trace ? trace : ''}`);
    }


    verbose(message: string, trace?: string, context?: string) {
        super.verbose(message);
        this.logToFile(`[VERBOSE] ${this.context ? '[' + this.context + '] ' : ''}${message} ${trace ? trace : ''}`);
    }
    private logToFile(message: string) {
        fs.appendFileSync(this.logFilePath, `${message}\n`);
    }
}
