import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { VictimService } from './victim.service';
import { CreateVictimDto } from './dto/create-victim.dto';
import { UpdateVictimDto } from './dto/update-victim.dto';
import { AuthGuard } from '@nestjs/passport';

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
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
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
