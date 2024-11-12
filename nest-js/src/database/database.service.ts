import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService extends PrismaClient implements OnModuleInit {

    constructor(private configService: ConfigService) {
        super({
            log: ['query', 'info', 'warn', 'error'],
        });
    }

    async onModuleInit() {
        await this.$connect()
        const dbUrl = this.configService.get<string>('DATABASE_URL');
        console.log(`Prisma connected to database: ${dbUrl}`);
    }
}
