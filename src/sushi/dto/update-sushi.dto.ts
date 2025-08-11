import { PartialType } from '@nestjs/mapped-types';
import { CreateSushiDto } from './create-sushi.dto';

export class UpdateSushiDto extends PartialType(CreateSushiDto) {}
