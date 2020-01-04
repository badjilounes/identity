import { ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository, UpdateResult } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private usersRepository: Repository<User>) { }

    async getUsers(): Promise<User[]> {
        return await this.usersRepository.find({
            relations: ['doctors']
        });
    }

    async getUserById(id: number): Promise<User> {
        const user: User | undefined = await this.usersRepository.findOne({
            where: [{ id }],
            relations: ['doctors']
        });
        
        if (!user) {
            throw new NotFoundException("Cet utilisateur n'existe pas");
        }
        return user;
    }

    async getUserByMail(email: string): Promise<User> {
        return await this.usersRepository.findOne({
            where: [{ email }],
            relations: ['doctors']
        });
    }

    async emailExists(email: string): Promise<boolean> {
        return !!await this.getUserByMail(email);
    }

    async createUser(user: Partial<User>): Promise<User> {
        user.password = await bcrypt.hash(user.password, 10);
        const emailExists = await this.emailExists(user.email);
        if (emailExists) {
            throw new ForbiddenException("Cet email est déjà utilisé.");
        }

        const userCreated: User = this.usersRepository.create(user);
        return this.usersRepository.save(userCreated);
    }

    async checkUserCredentials(email: string, password: string): Promise<User | undefined> {
        const user: User = await this.getUserByMail(email);
        if (!user) {
            throw new UnauthorizedException("Cet utilisateur n'existe pas.");
        }
        
        const passwordMatch: boolean = await bcrypt.compare(password, user.password)
        if (!passwordMatch) {
            throw new UnauthorizedException("Mot de passe incorrect.");
        }
        return user;
    }

    async updateUser(id: number, user: Partial<User>): Promise<User> {
        if (!!user.password) {
            user.password = await bcrypt.hash(user.password, 10);
        }

        const result: UpdateResult = await this.usersRepository.update(id, user);

        if (result.raw.affectedRows <= 0) {
            throw new NotFoundException("Cet utilisateur n'existe pas.");
        }
        return await this.getUserById(id);
    }

    async deleteUser(id: number): Promise<void> {
        const user: User | undefined = await this.getUserById(id);
        if (!user) {
            throw new NotFoundException("Cet utilisateur n'existe pas.");
        }
        await this.usersRepository.delete(user.id);
    }
}
