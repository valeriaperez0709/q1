import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './JwtStrategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
  imports:[TypeOrmModule.forFeature([User]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory:()=>{
      return{
        secret:"Soy s3cr3t0",
        signOptions:{
          expiresIn:'2h'
        }
      }
    }
  })
  ],
  exports:[TypeOrmModule,JwtStrategy,PassportModule, AuthModule],
})
export class AuthModule {}
