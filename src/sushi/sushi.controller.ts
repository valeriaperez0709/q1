import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { SushiService } from './sushi.service';
import { CreateSushiDto } from './dto/create-sushi.dto';
import { UpdateSushiDto } from './dto/update-sushi.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('sushi')
export class SushiController {
  constructor(private readonly sushiService: SushiService) {}

  @Post(":chefId")
  create(@Body() createSushiDto: CreateSushiDto
  ,@Param("chefId")chefId:string) {
    return this.sushiService.create(createSushiDto,chefId);
  }

  @Get()
  findAll() {
    return this.sushiService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard())
  findOne(@Param('id') id: string) {
    return this.sushiService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSushiDto: UpdateSushiDto) {
    return this.sushiService.update(id, updateSushiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sushiService.remove(id);
  }
}
