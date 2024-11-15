import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './users/users.module';
import { CampaignsModule } from './campaigns/campaigns.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { ShopsModule } from './shops/shops.module';
import { ConfigModule } from '@nestjs/config';
import { CharactersModule } from './characters/characters.module';
import { ItemsModule } from './items/items.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [
    DatabaseModule, 
    UsersModule, 
    ConfigModule.forRoot({
      isGlobal: true, // Makes the module global
      envFilePath: process.env.NODE_ENV === 'production' ? '.env.prod' : '.env.dev'
    }),
    CampaignsModule,
    ThrottlerModule.forRoot([{
      ttl: 1000, //Time 
      limit: 5 //Requests per time
    }]),
    AuthModule,
    ShopsModule,
    CharactersModule,
    ItemsModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  },
  {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
