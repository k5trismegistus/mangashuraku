import { MongoClient } from 'mongodb'

const mongodbUrl = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`
const client = new MongoClient(mongodbUrl)

let dbConnection

export const connectToServer = (callback) => {
  client.connect((err, db) => {
    if (err || !db) {
      return callback(err, null)
    }

    dbConnection = db.db(process.env.MONGODB_DB)
    return callback(null, dbConnection)
  })
}
