import { describe, expect, it, beforeAll, afterAll } from 'vitest'
import request from 'supertest'
import { App } from '../../app.js'
import { Connection } from '../../database/connection/connection.js'

describe('Register Controller', async () => {
  const app = new App().server
  await Connection.connect(process.env.DATABASE_MONGO_TMPFS_URL)

  it('should register an currency', async () => {
    const response = await request(app)
      .post('/currency/')
      .send({ code: 'HMG', price: 0.876 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(201)

    expect(response.body.id).toBeTruthy()
  })

  it('should return an http 400 error with message "currency already registered" ', async () => {
    const response = await request(app)
      .post('/currency/')
      .send({ code: 'HMG', price: 4.9867 })
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(400)
    expect(response.body).toMatchObject({ message: 'Currency already registered' })
  })
})
