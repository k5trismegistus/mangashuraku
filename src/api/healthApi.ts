import { Router } from 'express'

const healthApiRouter = Router()

healthApiRouter.get('/', async (req, res) => {
  res.send({ message: 'OK' })
})

export { healthApiRouter }
