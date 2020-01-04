import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiImplicitBody, ApiImplicitParam, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { UserDtoConverter } from './converter/userDto.converter';
import { UserDto } from './model/user.dto';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDtoConverter } from './converter/createUserDto.converter';
import { CreateUserDto } from './model/createUser.dto';
import { UpdateUserDtoConverter } from './converter/updateUserDto.converter';
import { UpdateUserDto } from './model/updateUser.Dto';

@ApiUseTags('users')
@Controller('users')
export class UsersController {

    constructor(
        private readonly service: UsersService, 
        private readonly userDtoConverter: UserDtoConverter,
        private readonly createUserDtoConverter: CreateUserDtoConverter,
        private readonly updateUserDtoConverter: UpdateUserDtoConverter
    ) { }
    
    @UseGuards(AuthGuard('auth'))
    @Get('')
    @ApiResponse({ status: 201, description: 'All users', type: UserDto, isArray: true})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getAll(): Promise<UserDto[]> {
        const users: User[] = await this.service.getUsers();
        return this.userDtoConverter.convertOutboundCollection(users);
    }

    @UseGuards(AuthGuard('auth'))
    @Get('me')
    @ApiResponse({ status: 201, description: 'User found', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async getProfile(@Request() req: any): Promise<UserDto> {
        return this.userDtoConverter.convertOutbound(req.user);
    }

    @UseGuards(AuthGuard('auth'))
    @Get(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to retrieve', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User found', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async get(@Param('id', new ParseIntPipe()) id: number): Promise<UserDto> {
        const user: User = await this.service.getUserById(id);
        return this.userDtoConverter.convertOutbound(user);
    }

    @Put()
    @ApiImplicitBody({name: 'CreateUserDto', description: 'User to create', type: CreateUserDto})
    @ApiResponse({ status: 201, description: 'User found', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    async create(@Body() user: CreateUserDto): Promise<UserDto> {
        const userToCreate: Partial<User> = this.createUserDtoConverter.convertInbound(user);
        const createdUser: User = await this.service.createUser(userToCreate);
        return this.userDtoConverter.convertOutbound(createdUser);
    }

    @UseGuards(AuthGuard('auth'))
    @Post(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to update', required: true, type: Number})
    @ApiImplicitBody({name: 'UpdateUserDto', description: 'User information to update', type: UpdateUserDto})
    @ApiResponse({ status: 201, description: 'User updated', type: UserDto})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async update(@Param('id', new ParseIntPipe()) id: number, @Body() user: UpdateUserDto): Promise<UserDto> {
        const userToUpdate: Partial<User> = this.updateUserDtoConverter.convertInbound(user);
        const userUpdated: User = await this.service.updateUser(id, userToUpdate);
        return this.userDtoConverter.convertOutbound(userUpdated);
    }

    @UseGuards(AuthGuard('auth'))
    @Delete(':id')
    @ApiImplicitParam({name: 'id', description: 'User id to delete', required: true, type: Number})
    @ApiResponse({ status: 201, description: 'User deleted'})
    @ApiResponse({ status: 401, description: 'User not authentificated'})
    @ApiResponse({ status: 404, description: 'User not found'})
    async deleteUser(@Param('id', new ParseIntPipe()) id: number): Promise<void> {
        return await this.service.deleteUser(id);
    }
}
