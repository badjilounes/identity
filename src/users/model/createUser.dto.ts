import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";
import { GenderEnum } from "../../common/gender.enum";

export class CreateUserDto {

    @ApiModelProperty()
    @IsEmail()
    email: string;

    @ApiModelProperty()
    @IsString()
    @IsOptional()
    password: string;

    @ApiModelProperty()
    @IsString()
    firstName: string;

    @ApiModelProperty()
    @IsString()
    lastName: string;

    @ApiModelProperty()
    @IsString()
    address: string;

    @ApiModelProperty({enum: Object.keys(GenderEnum).filter((v) => isNaN(+v))})
    @IsEnum(Object.keys(GenderEnum).filter((v) => isNaN(+v)))
    gender: string;
}