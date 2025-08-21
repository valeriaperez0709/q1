import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
import { Repository } from 'typeorm';
import { Victim } from 'src/victim/entities/victim.entity';

@Injectable()
export class CaseService {
  constructor(
    @InjectRepository(Case)
    private readonly caseRepository: Repository<Case>,
    @InjectRepository(Victim)
    private readonly victimRepository: Repository<Victim>,
  ) {}
  async create(createCaseDto: CreateCaseDto) {
    const newCase = this.caseRepository.create(createCaseDto);
    await this.caseRepository.save(newCase);
    return newCase;
  }

  findAll() {
    return this.caseRepository.find({});
  }

  findOne(id: number) {
    return `This action returns a #${id} case`;
  }

  update(id: number, updateCaseDto: UpdateCaseDto) {
    return `This action updates a #${id} case`;
  }

  remove(id: number) {
    return `This action removes a #${id} case`;
  }
  async victimByCase(caseid: string): Promise<Victim[]> {
    const c = await this.caseRepository.findOneBy({ id: caseid });
    if (!c) {
      throw new NotFoundException('No existe');
    }
    const victim = await this.victimRepository.find({
      where: { case: { id: caseid } },
    });
    return victim;
  }
  async victimByCases() {
    return await this.caseRepository
      .createQueryBuilder('case')
      .leftJoinAndSelect('case.victim', 'victim')
      .getMany();
  }
}
