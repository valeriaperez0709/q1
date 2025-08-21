import { Module } from '@nestjs/common';
import { CaseService } from './case.service';
import { CaseController } from './case.controller';
import { Victim } from 'src/victim/entities/victim.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Case } from './entities/case.entity';
@Module({
  controllers: [CaseController],
  providers: [CaseService],
  imports: [TypeOrmModule.forFeature([Case, Victim])],
  exports: [CaseService, TypeOrmModule],
})
export class CaseModule {}
