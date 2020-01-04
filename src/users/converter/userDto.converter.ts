import { Converter } from '../../common/converter';
import { GenderEnum } from '../../common/gender.enum';
import { UserDto } from '../model/user.dto';
import { User } from '../user.entity';

export class UserDtoConverter implements Converter<UserDto, User>{
    constructor() {}

    convertOutbound(user: User): UserDto {
        let userDto: UserDto = {
            id: user.id,
            address: user.address,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            gender: GenderEnum[user.gender],
        };

        return userDto;
    }

    convertOutboundCollection(users: User[]): UserDto[] {
        return users.map((user) => this.convertOutbound(user));
    }
}