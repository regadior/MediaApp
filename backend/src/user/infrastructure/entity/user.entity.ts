import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserRolEntity } from './user.rol.entity';
@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  surenames: string;
  @Column({ nullable: false, unique: true })
  username: string;
  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;
  @Column({ nullable: false })
  description: string;
  @Column({ nullable: false })
  imgPerfil: string;
  @Column({ nullable: false })
  imgBanner: string;
  @Column({ nullable: false })
  @CreateDateColumn()
  createdAt: Date;
  @UpdateDateColumn()
  updatedAt: Date;
  rol: UserRolEntity;
}
