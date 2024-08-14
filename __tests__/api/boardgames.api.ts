import request from 'supertest'
import { app } from '../../src/app';
import { BoardgameApiModel } from '../../src/models/BoardgameApiModel';
import { HTTP_STATUSES } from '../../src/types';
import { BoardgameCreateModel } from '../../src/models/BoardgameCreateModel';

beforeAll(async () => {
  await request(app).delete('/boardgames/tests');
})

afterAll(async () => {
  await request(app).delete('/boardgames/tests');
})

let createdBoardgame: BoardgameApiModel | null = null
const body: BoardgameCreateModel = { title: 'Test', players: '1' }

describe('/boardgames', () => {
  it('Should successfully create a boardgame', async () => {
    const response = await request(app)
      .post('/boardgames')
      .send(body)
      .expect(HTTP_STATUSES.CREATED_201);

    createdBoardgame = response.body;

    expect(createdBoardgame).toEqual({
      id: expect.any(String),
      ...body
    });
  })

  it('Should return 200 and 1 boardgame', async () => {
    await request(app).get('/boardgames').expect(200, [createdBoardgame]);
  })

  it('Should return 200 while edit boardgame', async () => {
    const updatedBody = { ...body, title: 'Oleh' }

    await request(app)
      .put(`/boardgames/${createdBoardgame?.id}`)
      .send(updatedBody)
      .expect(200, { ...updatedBody, id: createdBoardgame?.id })

    await request(app).get(`/boardgames/${createdBoardgame?.id}`).expect(200, { ...createdBoardgame, ...updatedBody })
  })

  it('Should return 204 while successful delete boardgame', async () => {
    await request(app).delete(`/boardgames/${createdBoardgame?.id}`).expect(204);
  })

  it('Should return 404 and not found message', async () => {
    await request(app).get(`/boardgames/${createdBoardgame}`).expect(404, { message: 'Game Not Found' })
  })
})