import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, ManyToOne, OneToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class UserRol {
    @PrimaryGeneratedColumn()
    rolId: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @OneToMany(() => User, (user) => user.userRol)
    user: User[];
}