import { MongoClient, Db } from 'mongodb'

const url = `mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`

let mongodb: Db

MongoClient.connect(
  url,
  {
    poolSize: 5,
  },
  (err, client) => {
    if (err) {
      throw Error
    }
    mongodb = client.db(process.env.MONGODB_DB)
  }
)

export const mongoClientInitialized = async () => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(() => {
      if (mongodb) {
        clearInterval(interval)
        resolve()
      }
    }, 100)
  })
}

export { mongodb }
