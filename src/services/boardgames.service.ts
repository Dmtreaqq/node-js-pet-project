import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { boardgamesRepository } from "../repositories/boardgames-db.repository";
import { Boardgame } from "../types";

export const boardgamesService = {
    async getGameById(id: string): Promise<Boardgame | null> {
        return boardgamesRepository.getGameById(id);
    },
    
    async getGames(title: string = ''): Promise<Boardgame[]> {
      return boardgamesRepository.getGames(title);
    },
    
    async createBoardgame(boardgame: BoardgameCreateModel): Promise<Boardgame | undefined> {
        const createdBoardgame: Boardgame = { id: crypto.randomUUID(), ...boardgame }
    
        if (boardgame && boardgame.title !== undefined) {
            return boardgamesRepository.createBoardgame(createdBoardgame);
        } else return
    },
    
    async updateGameById(id: string, boardgame: BoardgameUpdateModel): Promise<Boardgame> {
      const updatedGame = { ...boardgame, id, }
    
      await boardgamesRepository.updateGameById(id, updatedGame);
    
      return updatedGame;
    },
    
    async deleteGameById(id: string) {
        await boardgamesRepository.deleteGameById(id);
    },
    
    async deleteBoardgamesBeforeTest() {
        await boardgamesRepository.deleteBoardgamesBeforeTest();
    }
}
