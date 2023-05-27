import { Module } from '@nestjs/common';
import { RawgGameListController } from './api_rest/controller/get.rawg.game.list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserGameEntity } from './infrastructure/entity/user.game.entity';
import { UserGameSavegameEntity } from './infrastructure/entity/user.game.savegame.entity';
import { GameStateEntity } from './infrastructure/entity/game.state.entity';
import { GameStateTypeOrmRepositoryImpl } from './infrastructure/repository/game.state.typeorm.repository.impl';
import { GameStateRepository } from './domain/repository/game.state.repository';
import { UserGameStateInitializer } from './infrastructure/initializer/game.state.entity.initializer';
import { GameStateMapper } from './infrastructure/mapper/game.state.mapper';
import { UserGameRepository } from './domain/repository/user.game.repository';
import { UserGameTypeOrmRepositoryImpl } from './infrastructure/repository/user.game.typeorm.repository.impl';
import { PatchGameForUserController } from './api_rest/controller/patch.game.for.user.controller';
import { UserGameMapper } from './infrastructure/mapper/user.game.mapper';
import { RestGameUserMapper } from './api_rest/mapper/rest.game.user.mapper';
import { UpdateGameForUserUseCase } from './application/use_case/update.game.for.user.usecase';
import { UserRepository } from 'src/user/domain/repository/user.repository';
import { UserTypeOrmRepositoryImpl } from 'src/user/infrastructure/repository/user.typeorm.repository.impl';
import { UserMapper } from 'src/user/infrastructure/mapper/UserMapper';
import { UserEntity } from 'src/user/infrastructure/entity/user.entity';
import { UserRolEntity } from 'src/user/infrastructure/entity/user.rol.entity';
import { GetRawgGameGenreController } from './api_rest/controller/get.rawg.game.genre.controller';
import { GetRawgGamePaltformController } from './api_rest/controller/get.rawg.game.patform.controller';
import { GetRawgGamePublisherController } from './api_rest/controller/get.rawg.game.publisher.controller';
import { GetRawgGameStoresontroller } from './api_rest/controller/get.rawg.game.stores.controller';
import { GetGamesDetailsService } from './infrastructure/service/rawg/get.games.details.service';
import { GetGenresService } from './infrastructure/service/rawg/get.genres.service';
import { GetPlatformService } from './infrastructure/service/rawg/get.platform.service';
import { GetPublisherService } from './infrastructure/service/rawg/get.publishers.service';
import { GetStoresService } from './infrastructure/service/rawg/get.stores.service';
import { NotFoundExceptionFilter } from 'src/user/api_rest/exception/notfound.exception.handler';
import { APP_FILTER } from '@nestjs/core';
import { UserModule } from 'src/user/user.module';
import { ConflictExceptionFilter } from 'src/user/api_rest/exception/conflict.exception.handler';
import { FindUserGameByIdUseCase } from './application/use_case/find.user.game.by.id.use.case';
import { RestPatchGameUserMapper } from './api_rest/mapper/rest.patch.game.user.mapper';
import { GetUserGameForUserController } from './api_rest/controller/get.usergame.for.user.controller';
import { FindUserGameByIdAndUserIdUseCase } from './application/use_case/find.user.game.by.id.and.userid.use.case';
import { PostUserGameSavegameForGameController } from './api_rest/controller/post.usergame.savegame.controller';
import { CreateSavegameForUserGameUseCase } from './application/use_case/create.savegame.for.usergame.usecase';
import { RestSaveGameMapper } from './api_rest/mapper/rest.save.game.mapper';
import { UserGameSavegameTypeOrmRepositoryImpl } from './infrastructure/repository/user.game.savegame.typeorm.repository.impl';
import { UserGameSavegameRepository } from './domain/repository/user.game.savegame.repository';
import { GameSaveGameMapper } from './infrastructure/mapper/game.savegame.mapper';
import { PostFavouriteGameForUserController } from './api_rest/controller/post.favourite.game.for.user.controller';
import { CreateFavouriteGameForUserUseCase } from './application/use_case/create.favourite.game.foruser.usecase';
@Module({
  imports: [TypeOrmModule.forFeature([UserGameEntity, UserGameSavegameEntity, GameStateEntity, UserEntity, UserRolEntity]), UserModule],
  controllers: [
    RawgGameListController,
    PatchGameForUserController,
    GetRawgGameGenreController,
    GetRawgGamePaltformController,
    GetRawgGamePublisherController,
    GetRawgGameStoresontroller,
    GetUserGameForUserController,
    PostUserGameSavegameForGameController,
    PostFavouriteGameForUserController,
  ],
  providers: [
    UpdateGameForUserUseCase,
    FindUserGameByIdUseCase,
    FindUserGameByIdAndUserIdUseCase,
    CreateSavegameForUserGameUseCase,
    CreateFavouriteGameForUserUseCase,
    UserGameStateInitializer,
    GameStateMapper,
    UserGameMapper,
    RestGameUserMapper,
    UserMapper,
    RestPatchGameUserMapper,
    RestSaveGameMapper,
    GameSaveGameMapper,
    {
      provide: GameStateRepository,
      useClass: GameStateTypeOrmRepositoryImpl,
    },
    {
      provide: UserGameRepository,
      useClass: UserGameTypeOrmRepositoryImpl,
    },
    {
      provide: UserRepository,
      useClass: UserTypeOrmRepositoryImpl,
    },
    {
      provide: UserGameSavegameRepository,
      useClass: UserGameSavegameTypeOrmRepositoryImpl,
    },
    GetGamesDetailsService,
    GetGenresService,
    GetPlatformService,
    GetPublisherService,
    GetStoresService,
  ],
})
export class GameModule {}
