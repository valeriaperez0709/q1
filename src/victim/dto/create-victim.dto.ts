import {
  IsArray,
  IsInt,
  IsPositive,
  IsString,
  Min,
  MinLength,
} from 'class-validator';

export class CreateVictimDto {
  @IsString()
  @MinLength(2)
  name: string;
  @Min(1)
  @IsPositive()
  @IsInt()
  age: number;
  @IsString({ each: true })
  @IsArray()
  family: string[];
  @IsString()
  murderReason: string;
}
