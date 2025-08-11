import { IsArray, IsInt, IsPositive, IsString, Min, MinLength } from "class-validator";

export class CreateSushiDto {
    @IsString()
    @MinLength(2)
    name:string;
    @Min(1)
    @IsPositive()
    @IsInt()
    price:number;
    @IsString({each:true})
    @IsArray()
    ingredients:string[]

}
