require('dotenv').config()

import { MongoClient } from "mongodb"
import * as request from 'supertest'

import { initApp } from "../../app"
import { initRepositories } from "../../repository/repositories"

describe('Health API', () => {
  let repositories
  let connection: MongoClient
  let app

  beforeAll(async () => {
    connection = await MongoClient.connect(`mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`)

    repositories = initRepositories(connection.db(process.env.MONGODB_DB))
    app = initApp(repositories)
  })

  afterAll(async () => {
    await connection.close()
  })

  describe('GET /api/helath', () => {
    it('should return status 200', async () => {
      const response = await request(app).get('/api/health')
      expect(response.status).toBe(200)
    })
  })
})
