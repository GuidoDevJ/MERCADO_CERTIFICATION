import{ IsNumber, IsPositive, IsString, MinLength } from "class-validator" 

export class CreatePaymentDto {
    @IsString()
    @MinLength(1)
    title: string;
    @IsNumber()
    @IsPositive()
    unit_price: number;
    @IsNumber()
    @IsPositive()
    quantity: number;
}