import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class UserRol {
    @PrimaryGeneratedColumn()
    rolId: number;

    @Column()
    name: string;

    @Column()
    description: string;
}