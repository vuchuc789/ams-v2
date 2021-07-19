import mongoose from 'mongoose';

export class MongoDB {
  private static instance: MongoDB;

  private connection: Promise<typeof mongoose>;

  private constructor() {
    const mongoURI: string = process.env.MONGO_URI || '';

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

  static connect() {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB();
    }

    return MongoDB.instance.connection;
  }
}
