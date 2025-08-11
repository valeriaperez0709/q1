import { Module } from '@nestjs/common';
import { SushiService } from './sushi.service';
import { SushiController } from './sushi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sushi } from './entities/sushi.entity';
import { Chef } from 'src/chef/entities/chef.entity';

@Module({
  controllers: [SushiController],
  providers: [SushiService],
  imports:[TypeOrmModule.forFeature([Sushi,Chef])],
  exports:[TypeOrmModule]
})
export class SushiModule {}
