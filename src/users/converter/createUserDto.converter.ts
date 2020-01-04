import { Converter } from "../../common/converter";
import { GenderEnum } from "../../common/gender.enum";
import { CreateUserDto } from "../model/createUser.dto";
import { User } from "../user.entity";

export class CreateUserDtoConverter implements Converter<CreateUserDto, Partial<User>>{
    
    constructor() {}

    convertInbound(user: CreateUserDto): Partial<User> {
        let userToCreate = {
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            gender: GenderEnum[user.gender],
            password: user.password
        }

        return userToCreate;
    }
}