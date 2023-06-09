import { GameStateModel } from 'src/game/domain/model/game.state.model';
import { UserGameDto } from './../../domain/dto/user.game.dto';
import { UserGameModel } from 'src/game/domain/model/user.game.model';
import { FavouriteGameDto } from 'src/game/domain/dto/favourite.game.dto';

export class RestGameUserMapper {
  UserGameDtoToUserGameModel(userGameDto: UserGameDto): UserGameModel {
    const userGameModel = new UserGameModel();
    userGameModel.score = userGameDto.score;
    const gameStateModel = new GameStateModel();
    gameStateModel.state = userGameDto.state;
    userGameModel.gameState = gameStateModel;
    userGameModel.whishlist = userGameDto.whishlist;
    return userGameModel;
  }
  favouriteGameDtoToUserGameModel(favouriteGameDto: FavouriteGameDto): UserGameModel {
    const userGameModel = new UserGameModel();
    userGameModel.whishlist = favouriteGameDto.whishlist;
    return userGameModel;
  }
}
