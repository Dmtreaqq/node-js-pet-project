import { usersCollection } from "./db";
import { Boardgame } from "../types";

export const usersRepository = {
    async createUser(user: any): Promise<Boardgame> {
        await usersCollection.insertOne(user);

        return user;
    },

    async getUserByLogin(login: string): Promise<any> {
        return usersCollection.findOne({ login })
    }
}