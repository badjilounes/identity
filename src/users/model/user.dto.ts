import { ApiModelProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString } from "class-validator";
import { GenderEnum } from "../../common/gender.enum";

export class UserDto {
    @ApiModelProperty()
    @IsNumber()
    id: number;

    @ApiModelProperty()
    @IsEmail()
    email: string;

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
    @IsString()
    gender: string;
}