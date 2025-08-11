import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateChefDto } from './dto/create-chef.dto';
import { UpdateChefDto } from './dto/update-chef.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Chef } from './entities/chef.entity';
import { Repository } from 'typeorm';
import { Sushi } from 'src/sushi/entities/sushi.entity';

@Injectable()
export class ChefService {
  constructor(
    @InjectRepository(Chef)
    private readonly chefRepository:Repository<Chef>,
    @InjectRepository(Sushi)
    private readonly sushiRepository:Repository<Sushi>
  ){}
  async create(createChefDto: CreateChefDto) {
    const newChef=this.chefRepository.create(createChefDto);
    await this.chefRepository.save(newChef);
    return newChef;
  }

  findAll() {
    return this.chefRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} chef`;
  }

  update(id: number, updateChefDto: UpdateChefDto) {
    return `This action updates a #${id} chef`;
  }

  remove(id: number) {
    return `This action removes a #${id} chef`;
  }
  async sushiByChef(chefid:string):Promise<Sushi[]>{
    const chef=await this.chefRepository.
    findOneBy({id:chefid});
    if(!chef){
      throw new NotFoundException("No existe ಥ_ಥ")
    }
    const sushi=await this.sushiRepository.find({
      where:{chef:{id:chefid}}
    })
    return sushi;
  }
  async sushiByChefs(){
    
    return await this.chefRepository.
    createQueryBuilder('chef').
    leftJoinAndSelect('chef.sushi','sushi').getMany()

  }
  
}
