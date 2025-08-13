import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { User } from "./entities/auth.entity";
export interface JwtPayload {
    email: string;
    roles:string[];
}
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(
        @InjectRepository(User)
        private readonly dictatorRepository:Repository<User>,

        private readonly jwtService:JwtService
    ){
        super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SECRET_KEY || '', // <-- aquí el fix
      ignoreExpiration: false, // opcional
    });
    }
     
    async validate(payload:JwtPayload){
       const {email}=payload;
         const dictator=await this.dictatorRepository.
        findOneBy({email:email});
        if(!dictator){
                throw new Error('User not found');
        }
            return dictator;
    }
}