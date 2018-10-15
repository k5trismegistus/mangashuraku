require('dotenv').config()
import * as request from 'supertest'
import { app } from '../../app'

describe('GET /api/helath', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api/health')
    expect(response.status).toBe(200)
  })
})
