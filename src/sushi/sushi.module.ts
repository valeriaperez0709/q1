import { Module } from '@nestjs/common';
import { SushiService } from './sushi.service';
import { SushiController } from './sushi.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sushi } from './entities/sushi.entity';
import { Chef } from 'src/chef/entities/chef.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [SushiController],
  providers: [SushiService],
  imports:[TypeOrmModule.forFeature([Sushi,Chef]),AuthModule],
  exports:[TypeOrmModule]
})
export class SushiModule {}
