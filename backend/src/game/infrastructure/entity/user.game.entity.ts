import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, JoinColumn, ManyToOne } from 'typeorm';
import { UserGameSavegameEntity } from './user.game.savegame.entity';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { GameStateEntity } from './game.state.entity';
@Entity()
export class UserGameEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  userGameId: number;
  @ManyToOne(() => UserEntity)
  @JoinColumn()
  userEntity: UserEntity;
  @Column({ nullable: false })
  gameId: number;
  @Column()
  score: number;
  @Column()
  whishlist: boolean;
  @ManyToOne(() => GameStateEntity)
  @JoinColumn()
  gameState: GameStateEntity;
  @OneToMany(() => UserGameSavegameEntity, (userGameSavegame) => userGameSavegame.userGame)
  userGameSavegames: UserGameSavegameEntity[];
}
