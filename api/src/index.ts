require('dotenv').config()
import { app } from './app'
import { mongoClientInitialized } from './lib/mongo'

mongoClientInitialized().then(() => {
  app.listen(
    3001,
    () => {
        console.log('Example app listening on port 3001!');
    }
  )
})

