import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { User } from '../users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../users/model/user.dto';
import { UserDtoConverter } from '../users/converter/userDto.converter';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UsersService, 
        private readonly jwtService: JwtService,
        private readonly userDtoConverter: UserDtoConverter
    ) {}

    /**
     * 
     * @param { string } email 
     * @param { string } password 
     * @returns { {access_token: string;} }
     */
    async login(email: string, password: string): Promise<{access_token: string}> {
        const user: UserDto = this.userDtoConverter.convertOutbound( 
            await this.userService.checkUserCredentials(email, password)
        );
            
        return {
            access_token: this.jwtService.sign(user)
        };
    }

    /**
     * 
     * @param userId 
     * @returns {User} 
     */
    async validate(userId: number): Promise<User> {
        return await this.userService.getUserById(userId);
    }
}
