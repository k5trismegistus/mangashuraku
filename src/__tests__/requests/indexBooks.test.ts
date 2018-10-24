require('dotenv').config()
import * as http from 'http'
import * as request from 'supertest'
import { app } from '../../app'

jest.mock('../../repository/booksRepository')

let server: http.Server

beforeAll((done) => {
  server = http.createServer(app)
  server.listen(done)
})

afterAll((done) => {
  server.close(done)
})

describe('GET /books', () => {
  it('should return status 200', async () => {
    const response = await request(app).get('/api/books')
    expect(response.status).toBe(200)
  })
})
