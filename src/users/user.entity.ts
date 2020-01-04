import { IsNumber, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GenderEnum } from '../common/gender.enum';
@Entity()
export class User {

    @PrimaryGeneratedColumn()
    @IsNumber()
    id: number;

    @Column({ type: String })
    @IsString()
    email = '';

    @Column({ type: String })
    @IsString()
    password = '';

    @Column({ type: String })
    @IsString()
    firstName = '';

    @Column({ type: String })
    @IsString()
    lastName = '';

    @Column({ type: String })
    @IsString()
    address = '';

    @Column({ type: Number })
    @IsNumber()
    gender = GenderEnum.Male;
}