import { Router } from 'express'

export const HealthApiRouter = (_): Router => {
  const router = Router()
  router.get('/', async (req, res) => {
    res.send({ message: 'OK' })
  })

  return router
}
