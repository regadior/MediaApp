import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
@Entity()
export class UserGameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userGameId: number;
  @Column({ nullable: false })
  userId: number;
  @Column({ nullable: false })
  gameId: number;
  @Column({ nullable: false })
  whishlist: boolean;
}