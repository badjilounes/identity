import { ApiModelProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TokenDto {
    @ApiModelProperty()
    @IsString()
    access_token: string;
}