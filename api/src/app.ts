import * as Express from 'express'
import { ApiRouter } from './api/api'


const initApp = (repositories) => {
  const app = Express()

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    next()
  })

  const apiRouter = ApiRouter(repositories)
  app.use('/api', apiRouter)

  return app
}

export { initApp }
