import { MongoClient, Db } from 'mongodb'

export const connectDb = (): Promise<Db> => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(
      `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`,
      (err, client) => {
        if (err) {
          return reject(err)
        }
        resolve(client.db(process.env.MONGODB_DB))
      }
    )
  })
}
