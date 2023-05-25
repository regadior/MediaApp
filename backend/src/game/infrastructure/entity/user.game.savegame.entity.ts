import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from 'typeorm';
import { UserGameEntity } from './user.game.entity';
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
  @Column()
  dateSave: Date;
  @ManyToOne(() => UserGameEntity, (userGame) => userGame.userGameSavegames)
  userGame: UserGameEntity;
}
