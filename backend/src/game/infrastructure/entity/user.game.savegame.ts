import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity()
export class UserGameSavegameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userGameSavegameId: number;
  @Column({ nullable: false })
  name: string;
  @Column({ nullable: false })
  state: string;
  @Column({ nullable: false })
  description: string;
  dateSave: Date;
}
