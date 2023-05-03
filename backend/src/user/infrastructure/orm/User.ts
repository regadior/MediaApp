import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm";
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

    @ManyToOne(() => UserRol, userRol => userRol.rolId)
    userRol: UserRol;
}