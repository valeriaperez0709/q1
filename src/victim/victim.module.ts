import { Module } from '@nestjs/common';
import { VictimService } from './victim.service';
import { VictimController } from './victim.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Victim } from './entities/victim.entity';
import { Case } from 'src/case/entities/case.entity';

@Module({
  controllers: [VictimController],
  providers: [VictimService],
  imports:[TypeOrmModule.forFeature([Victim,Case])],
  exports:[TypeOrmModule]
})
export class VictimModule {}
