import { GameSaveGameMapper } from './../mapper/game.savegame.mapper';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { UserGameSavegameModel } from 'src/game/domain/model/user.game.savegame.model';
import { UserGameSavegameRepository } from 'src/game/domain/repository/user.game.savegame.repository';
import { UserGameSavegameEntity } from '../entity/user.game.savegame.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserGameSavegameTypeOrmRepositoryImpl implements UserGameSavegameRepository {
  constructor(
    private readonly gameSaveGameMapper: GameSaveGameMapper,
    @InjectRepository(UserGameSavegameEntity) private readonly gameSaveGameRepository: Repository<UserGameSavegameEntity>,
  ) {}
  async findOneByUserGameSavegameId(savegameId: number): Promise<UserGameModel> {
    throw new Error('Method not implemented.');
  }
  async create(userGameSavegameModel: UserGameSavegameModel): Promise<UserGameSavegameModel> {
    const saveGameEntity = this.gameSaveGameMapper.saveGameModelToSavaGameEntity(userGameSavegameModel);
    const createdSaveGameEntity = await this.gameSaveGameRepository.save(saveGameEntity);

    const a = this.gameSaveGameMapper.saveGameEntityToSavaGameModel(createdSaveGameEntity);
    return a;
  }
}
