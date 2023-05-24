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
@Module({
  imports: [TypeOrmModule.forFeature([UserGameEntity, UserGameSavegameEntity, GameStateEntity, UserEntity, UserRolEntity]), UserModule],
  controllers: [
    RawgGameListController,
    PatchGameForUserController,
    GetRawgGameGenreController,
    GetRawgGamePaltformController,
    GetRawgGamePublisherController,
    GetRawgGameStoresontroller,
  ],
  providers: [
    UpdateGameForUserUseCase,
    UserGameStateInitializer,
    GameStateMapper,
    UserGameMapper,
    RestGameUserMapper,
    UserMapper,
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
      //To create the exception handler
      provide: APP_FILTER, //Exception filter provider of app
      useClass: NotFoundExceptionFilter, //Filter type (exceptions)
    },
    GetGamesDetailsService,
    GetGenresService,
    GetPlatformService,
    GetPublisherService,
    GetStoresService,
  ],
})
export class GameModule {}
