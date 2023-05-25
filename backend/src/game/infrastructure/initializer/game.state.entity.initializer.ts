import { GameStateEntity } from '../entity/game.state.entity';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { GameStateRepository } from 'src/game/domain/repository/game.state.repository';

@Injectable()
export class UserGameStateInitializer implements OnModuleInit {
  constructor(
    @Inject(GameStateRepository)
    private readonly gameStateRepository: GameStateRepository,
  ) {}
  async onModuleInit() {
    await this.createDefaultUserRoles();
  }
  async createDefaultUserRoles() {
    //Initialize state uncategorized
    const state1 = await this.gameStateRepository.findOneByState('uncategorized');
    if (state1 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'uncategorized';
      gameStateEntity.description = 'I will choose the category later';
      gameStateEntity.save();
    }
    //Initialize state playing
    const state2 = await this.gameStateRepository.findOneByState('playing');
    if (state2 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'playing';
      gameStateEntity.description = 'I play the game regularly';
      gameStateEntity.save();
    }
    //Initialize state completed
    const state3 = await this.gameStateRepository.findOneByState('completed');
    if (state3 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'completed';
      gameStateEntity.description = 'I reached my goal in the game';
      gameStateEntity.save();
    }
    //Initialize state played
    const state4 = await this.gameStateRepository.findOneByState('played');
    if (state4 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'played';
      gameStateEntity.description = 'I played the game but I didnt reach my goal';
      gameStateEntity.save();
    }
    //Initialize state not played
    const state5 = await this.gameStateRepository.findOneByState('not played');
    if (state5 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'not played';
      gameStateEntity.description = 'I am going to play later';
      gameStateEntity.save();
    }
    //Initialize state abandoned
    const state6 = await this.gameStateRepository.findOneByState('abandoned');
    if (state6 == null) {
      const gameStateEntity = new GameStateEntity();
      gameStateEntity.gameStateid = 0;
      gameStateEntity.state = 'abandoned';
      gameStateEntity.description = 'I am not going to play anymore';
      gameStateEntity.save();
    }
  }
}
