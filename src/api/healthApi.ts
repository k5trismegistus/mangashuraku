import { Router } from 'express'
import { Db } from 'mongodb'

const healthApiRouter = (db: Db): Router => {
  const router = Router()

  router.get('/', (req, res) => {
    res.send({ message: 'OK' })
  })

  return router
}

export { healthApiRouter }
