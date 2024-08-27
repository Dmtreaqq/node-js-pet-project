import { boardgamesCollection } from "./db";
import { BoardgameCreateModel } from "../models/BoardgameCreateModel";
import { BoardgameUpdateModel } from "../models/BoardgameUpdateModel";
import { Boardgame } from "../types";

export const boardgamesRepository = {
    async getGameById(id: string): Promise<Boardgame | null> {
        return boardgamesCollection.findOne({ id })
    },
    
    async getGames(title: string = '', page: number, pageSize: number): Promise<Boardgame[]> {
      if (title) {
        return boardgamesCollection
                .find({ title: { $regex: title } })
                .skip((page - 1) * pageSize)
                .limit(pageSize).toArray();
      } else {
        return boardgamesCollection
                .find({})
                .skip((page - 1) * pageSize)
                .limit(pageSize).toArray();
      }
    },
    
    async createBoardgame(boardgame: Boardgame): Promise<Boardgame> {
        await boardgamesCollection.insertOne(boardgame);

        return boardgame;
    },

    async updateGameById(id: string, boardgame: Boardgame): Promise<Boardgame> {
      await boardgamesCollection.replaceOne({ id }, boardgame);
    
      return boardgame;
    },
    
    async deleteGameById(id: string) {
        await boardgamesCollection.deleteOne({ id })
    },
    
    async deleteBoardgamesBeforeTest() {
    
    }
}