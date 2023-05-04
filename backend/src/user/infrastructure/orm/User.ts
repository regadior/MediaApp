import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, OneToOne } from "typeorm";
import { UserRol } from "./UserRol"
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;
    @Column()
    name: string;
    @Column()
    surenames: string;
    @Column()
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    description: string;
    @Column()
    imgPerfil: string;
    @Column()
    imgBanner: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToOne(() => UserRol, (userRol) => userRol.user)
    userRol: UserRol;
}