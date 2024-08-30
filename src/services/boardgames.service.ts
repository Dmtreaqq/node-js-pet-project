import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { MultipleBoardgameApiModel } from "../models/MultipleBoardgameApiModel";
import { boardgamesRepository } from "../repositories/boardgames-db.repository";
import { Boardgame } from "../types";

export const boardgamesService = {
    async getGameById(id: string): Promise<Boardgame | null> {
        return boardgamesRepository.getGameById(id);
    },
    
    async getGames(title: string = '', page: string = '1', pageSize: string = '10'): Promise<MultipleBoardgameApiModel> {
      return boardgamesRepository.getGames(title, Number(page), Number(pageSize));
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
