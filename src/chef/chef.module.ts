import { Module } from '@nestjs/common';
import { ChefService } from './chef.service';
import { ChefController } from './chef.controller';
import { Sushi } from 'src/sushi/entities/sushi.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chef } from './entities/chef.entity';
@Module({
  controllers: [ChefController],
  providers: [ChefService],
  imports:[TypeOrmModule.forFeature([Chef,Sushi])],
  exports:[ChefService,TypeOrmModule]
})
export class ChefModule {}
