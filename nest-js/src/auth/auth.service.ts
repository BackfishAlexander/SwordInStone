import { HttpException, HttpStatus, Injectable, OnModuleInit, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from 'src/database/database.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService implements OnModuleInit {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private databaseService: DatabaseService,
        private configService: ConfigService
    ) {}

    async onModuleInit() {
        await this.ensureAdminUser();
    }

    private async ensureAdminUser() {
      const adminUser = await this.databaseService.users.findUnique({
        where: { username: 'admin' }
      });

      if (!adminUser) {
        const hashedPassword = await bcrypt.hash(this.configService.get<string>('ADMIN_PASSWORD'), 10);

        await this.databaseService.users.create({
          data: {
            username: 'admin',
            password: hashedPassword,
            role: 'ADMIN',
            isSubscriber: true,
          }
        })
      }
    }

    async signIn(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        const user = await this.usersService.findByUsername(username);
        
        // Ensure user exists and has a password
        if (!user || !user.password) {
            throw new UnauthorizedException();
        }

        // Check password
        const passwordMatches = await bcrypt.compare(pass, user.password);
        if (!passwordMatches) {
            throw new UnauthorizedException();
        }

        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }

    async register(
        username: string,
        pass: string,
      ): Promise<{ access_token: string }> {
        // const user = await this.usersService.findByUsername(username);
        let user;
        pass = await bcrypt.hash(pass, 10);
        try {
            user = await this.usersService.create({username: username, password: pass});
        }
        catch (error) {
            throw new HttpException("Username already exists", HttpStatus.CONFLICT);
        }

        const payload = { sub: user.id, username: user.username, role: user.role };
        return {
          access_token: await this.jwtService.signAsync(payload),
        };
    }
}
