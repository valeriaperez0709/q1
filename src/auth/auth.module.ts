import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports:[TypeOrmModule.forFeature([User]),
  JwtModule.registerAsync({
    imports:[],
    inject:[],
    useFactory:()=>{
      return{
        secret:process.env.SECRET_PASSWORD,
        signOptions:{
          expiresIn:'2h'
        }
      }
    }
  })
  ]
})
export class AuthModule {}
