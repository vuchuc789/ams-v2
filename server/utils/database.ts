import mongoose from 'mongoose';
import type { Mongoose } from 'mongoose';

export class Database {
  private static instance: Database;

  private connection: Promise<Mongoose>;

  private constructor() {
    const mongoURI: string | undefined = process.env.MONGO_URI;

    if (!mongoURI) {
      throw new Error('MONGO_URI is not found in .env.local');
    }

    this.connection = mongoose
      .connect(mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true,
      })
      .then((connection) => {
        return connection;
      });
  }

  static async connect() {
    if (!Database.instance || !Database.instance.connection) {
      Database.instance = new Database();
    }

    return await Database.instance.connection;
  }
}
