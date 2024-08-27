import { MongoClient } from "mongodb"
import { Boardgame } from "../types";

const mongoUri = process.env.mongoUri || 'mongodb://0.0.0.0:27017'

const client = new MongoClient(mongoUri);

export const runDb = async () => {
    try {
        await client.connect();
        await client.db('boardgames').command({ ping: 1 })
        console.log('Connected to MongoDB successfully')
    } catch {
        console.log('Connection to MongoDB closed');
        await client.close();
    }
}

export const boardgamesCollection = client.db('boardify').collection<Boardgame>('boardify');