import request from 'supertest'
import { app } from '../../src';
import { server } from '../../src';
import { BoardgameApiModel } from '../../src/models/BoardgameApiModel';
import { HTTP_STATUSES } from '../../src/types';

beforeAll(async () => {
  await request(app).delete('/tests');
})

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

  it('Should successfully create a boardgame', async () => {
    const body: BoardgameApiModel = { title: 'Bloom', players: '1' }

    await request(app)
    .post('/boardgames')
    .send(body)
    .expect(HTTP_STATUSES.CREATED_201);
  })
})

afterAll(() => {
  server.close();
})
