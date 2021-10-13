require('dotenv').config()
import { initApp } from './app'
import { connectToServer } from './lib/mongo'
import { initRepositories } from './repository/repositories'

connectToServer((err, db) => {

  console.log(process.env.MINIO_ACCESS_KEY)

  if (err) {
    console.error(err)
    process.exit()
  }

  const repositories = initRepositories(db)
  const app = initApp(repositories)

  app.listen(
    3001,
    () => {
        console.log('Example app listening on port 3001!');
    }
  )
})

