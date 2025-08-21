import { Injectable, NotFoundException, ShutdownSignal } from '@nestjs/common';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Victim } from './entities/victim.entity';
import { MoreThan, Repository } from 'typeorm';
import { Case } from 'src/case/entities/case.entity';

@Injectable()
export class VictimService {
  constructor(
    @InjectRepository(Victim)
    private readonly victimRepository: Repository<Victim>,
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
  ) {}
  async create(CreateVictimDto: CreateVictimDto, caseId: string) {
    const c = await this.caseRepository.findOneBy({ id: caseId });
    if (!c) {
      throw new NotFoundException('Case not found');
    }
    const victim = this.victimRepository.create(CreateVictimDto);
    victim.case = c;
    await this.victimRepository.save(victim);
    return victim;
  }

  async findAll() {
    const victim = await this.victimRepository.find({
      where: {
        age: MoreThan(20),
      },
      order: {
        age: 'DESC',
      },
    });
    return victim;
  }

  async findOne(id: string) {
    const victim = await this.victimRepository.findOneBy({ id: id });
    console.log(victim);
    if (!victim) {
      throw new NotFoundException('Victim no encontrado');
    }
    return victim;
  }

  async update(id: string, UpdateVictimDto: UpdateVictimDto) {
    const victim = await this.victimRepository.preload({
      id: id,
      ...UpdateVictimDto,
    });
    if (!victim) {
      throw new NotFoundException('No existe');
    }
    this.victimRepository.save(victim);
    return victim;
  }

  async remove(id: string) {
    const victim = await this.findOne(id);
    this.victimRepository.delete({ id: id });
    return victim;
  }
}
