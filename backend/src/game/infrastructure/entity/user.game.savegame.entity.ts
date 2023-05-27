import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, JoinColumn } from 'typeorm';
import { UserGameEntity } from './user.game.entity';
import { GameStateEntity } from './game.state.entity';
@Entity()
export class UserGameSavegameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userGameSavegameId: number;
  @Column({ nullable: false })
  name: string;
  @ManyToOne(() => GameStateEntity)
  @JoinColumn()
  saveState: GameStateEntity;
  @Column({ nullable: false })
  description: string;
  @Column()
  dateSave: string;
  @ManyToOne(() => UserGameEntity, (userGame) => userGame.saveGames)
  userGame: UserGameEntity;
}
