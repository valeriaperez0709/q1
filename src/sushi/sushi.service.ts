import { Injectable, NotFoundException, ShutdownSignal } from '@nestjs/common';
import { CreateSushiDto } from './dto/create-sushi.dto';
import { UpdateSushiDto } from './dto/update-sushi.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sushi } from './entities/sushi.entity';
import { MoreThan, Repository } from 'typeorm';
import { Chef } from 'src/chef/entities/chef.entity';

@Injectable()
export class SushiService {
  constructor(
    @InjectRepository(Sushi)
    private readonly sushiRepository:Repository<Sushi>,
    @InjectRepository(Chef)
    private readonly chefRepository:Repository<Chef>
  ){}
  async create(createSushiDto: CreateSushiDto, chefId:string) {
    const chef=await this.chefRepository.findOneBy({id:chefId});
    if(!chef){
      throw new NotFoundException("Chef not found");
    }
    const sushi=this.sushiRepository.create(createSushiDto);
    sushi.chef=chef;
    await this.sushiRepository.save(sushi);
    return sushi;
  }

  async findAll() {
    let sushi=await this.sushiRepository.find({
      where:{
        price:MoreThan(20)
      },
      order:{
        price:'DESC'
      }
    });
    return sushi;
  }

  async findOne(id: string) {
    const sushi=await this.sushiRepository.findOneBy({id:id});
    console.log(sushi)
    if(!sushi){
      throw new NotFoundException
      ("Sushi no encontrado perra (⌐■_■)");
    }
    return sushi;

  }

  async update(id: string, updateSushiDto: UpdateSushiDto) {
    const sushi=await this.sushiRepository.preload(
      {id:id,...updateSushiDto}
    )
    if(!sushi){
      throw new NotFoundException("No existe maldito");
    }
    this.sushiRepository.save(sushi);
    return sushi;
  }

  async remove(id: string) {
    const sushi=await this.findOne(id);
    this.sushiRepository.delete({id:id});
    return sushi;
  }
}
