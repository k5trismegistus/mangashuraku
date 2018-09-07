import { Router } from 'express'

const healthApiRouter = Router()

healthApiRouter.get('/', (req, res) => {
  res.send({ message: 'OK' })
})

export { healthApiRouter }
