import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VictimService } from './victim.service';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';


@Controller('victim')
export class VictimController {
  constructor(private readonly victimService: VictimService) {}

  @Post(':caseId')
  create(
    @Body() createVictimDto: CreateVictimDto,
    @Param('caseId') caseId: string,
  ) {
    return this.victimService.create(createVictimDto, caseId);
  }

  @Get()
  findAll() {
    return this.victimService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log("SDSDSSD", id)
    return this.victimService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVictimDto: UpdateVictimDto) {
    return this.victimService.update(id, updateVictimDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.victimService.remove(id);
  }
}
