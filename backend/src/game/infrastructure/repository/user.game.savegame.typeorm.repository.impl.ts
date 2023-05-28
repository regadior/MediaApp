import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { UserGameSavegameModel } from 'src/game/domain/model/user.game.savegame.model';
import { UserGameSavegameRepository } from 'src/game/domain/repository/user.game.savegame.repository';
import { UserGameSavegameEntity } from '../entity/user.game.savegame.entity';
import { Repository } from 'typeorm';
import { GameSaveGameMapper } from '../mapper/game.savegame.mapper';

@Injectable()
export class UserGameSavegameTypeOrmRepositoryImpl implements UserGameSavegameRepository {
  constructor(
    private readonly gameSaveGameMapper: GameSaveGameMapper,
    @InjectRepository(UserGameSavegameEntity) private readonly gameSaveGameRepository: Repository<UserGameSavegameEntity>,
  ) {}
  async findOneBySaveGameId(savegameId: number): Promise<UserGameSavegameModel> {
    return this.gameSaveGameMapper.saveGameEntityToSavaGameModel(await this.gameSaveGameRepository.findOne({ where: { userGameSavegameId: savegameId } }));
  }
  async create(userGameSavegameModel: UserGameSavegameModel): Promise<UserGameSavegameModel> {
    return this.gameSaveGameMapper.saveGameEntityToSavaGameModel(
      await this.gameSaveGameRepository.save(this.gameSaveGameMapper.saveGameModelToSavaGameEntity(userGameSavegameModel)),
    );
  }
}
