import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CaseService } from './case.service';
import { CreateCaseDto } from './dto/create-case.dto';
import { UpdateCaseDto } from './dto/update-case.dto';
import { Victim } from 'src/victim/entities/victim.entity';

@Controller('case')
export class CaseController {
  constructor(private readonly caseService: CaseService) {}

  @Post()
  create(@Body() createCaseDto: CreateCaseDto) {
    return this.caseService.create(createCaseDto);
  }

  @Get()
  findAll() {
    return this.caseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.caseService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCaseDto: UpdateCaseDto) {
    return this.caseService.update(+id, updateCaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.caseService.remove(+id);
  }
  @Get(':caseId/victim')
  async getVictimByCase(@Param('caseId') caseId: string): Promise<Victim[]> {
    return this.caseService.victimByCase(caseId);
  }
  @Get('/casesxvictims/consulta')
  async getAllVictimCases() {
    return this.caseService.victimByCases();
  }
}
