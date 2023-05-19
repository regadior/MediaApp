import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class GameStateEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  gameStateid: number;
  @Column({ nullable: false })
  state: string;
  @Column({ nullable: true })
  description: string;
}
