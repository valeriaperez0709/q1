import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/auth.entity';
import { Repository } from 'typeorm';
import { LoginAuthDto } from './dto/login.dto';
import { JwtPayload } from './JwtStrategy';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository:Repository<User>,
    private readonly jwtService:JwtService
  ){}
  async create(createAuthDto: CreateAuthDto) {
    try {
      const user=this.userRepository.create({
        ...createAuthDto,
        password:bcrypt.hashSync(createAuthDto.password,10)
      })
      await this.userRepository.save(user);
      return user;
    } catch (error) {
      throw new BadRequestException(error.detail);
    }
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  private getJwtToken(jwtPayload:JwtPayload){
    const token=this.jwtService.sign(jwtPayload);
    return token;
    }
  async login(loginUser:CreateAuthDto){
    console.log(loginUser);
    try{
      console.log("entra")
      const{email,password}=loginUser;
      const user=await this.userRepository.findOneBy({email});
      console.log(user);
      if(!user) throw new UnauthorizedException("Invalid credentials");
      const isValid=bcrypt.compareSync(password,user.password);
      if(!isValid)throw new UnauthorizedException("Invalid credentials");
      const jwtPayload:JwtPayload={email,roles:user.roles};
      const token=this.getJwtToken(jwtPayload);
     return {user,token};

    }catch(e){
      throw new UnauthorizedException("Invalid credentials");
    }
  }
}
