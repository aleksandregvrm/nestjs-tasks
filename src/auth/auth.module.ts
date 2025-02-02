import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersRepository } from './users.repository';
import { User } from './user.entity';
import { PassportModule } from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

// @Module({
//   imports: [
//     PassportModule.register({ defaultStrategy: 'jwt' }),
//     JwtModule.register({
//       secret:'topSecret51',
//       signOptions:{expiresIn:3600}
//     }),
//     TypeOrmModule.forFeature([User])
//   ],
//   providers: [AuthService, UsersRepository,JwtStrategy],
//   controllers: [AuthController],
//   exports:[JwtStrategy,PassportModule]
// })
// export class AuthModule { }

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
       return {
         secret: configService.get('JWT_SERVICE'),
         signOptions: {
           expiresIn: 3600,
         },
       }
      }
    }),
    TypeOrmModule.forFeature([User]),
  ],
  providers: [AuthService, JwtStrategy, UsersRepository],
  controllers: [AuthController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule { }
