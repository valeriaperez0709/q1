import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { SushiModule } from './sushi/sushi.module';
import { ChefModule } from './chef/chef.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    AuthModule,
    ConfigModule.forRoot(),TypeOrmModule.forRoot({
      type:'postgres',
      host:process.env.DB_HOST,
      port:5432,
      database:process.env.DB_NAME,
      username:process.env.DB_USER,
      password:process.env.DB_PASSWORD,
      //url:process.env.DATABASE_URL,
      autoLoadEntities:true,
      synchronize:true,
      
    }), SushiModule, ChefModule, AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
