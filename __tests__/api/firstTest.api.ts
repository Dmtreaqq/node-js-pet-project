import request from 'supertest'
import { app } from '../../src';
import { server } from '../../src';

describe('/boardgames', () => {
  it('Should return 200 and empty array', async () => {
    await request(app)
      .get('/boardgames')
      .expect(200, [])
  })

  it('Should return 404 and not found message', async () => {
    await request(app)
      .get('/boardgames/1')
      .expect(404, { message: 'Game Not Found' })
  })
})

afterAll(() => {
  server.close();
})
