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
const body: BoardgameCreateModel = {
  title: 'Test',
  minPlayers: '1',
  maxPlayers: '2',
  genre: 'straetgy',
  playTimeMinutes: '20 min',
  yearPublished: '2022'
}

describe('/boardgames positive', () => {
  it('Should successfully create a boardgame and return 201', async () => {
    const response = await request(app)
      .post('/boardgames')
      .send(body)
      .set('Authorization', 'Basic YWRtaW46MTIzNDU=')
      .expect(HTTP_STATUSES.CREATED_201)

    createdBoardgame = response.body;

    expect(createdBoardgame).toEqual({
      id: expect.any(String),
      ...body
    });
  })

  it('Should get by id return 200 and 1 boardgame', async () => {
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
})

describe('/boardgames negative', () => {
  it('Should return 404 and not found message While Get', async () => {
    await request(app).get(`/boardgames/${createdBoardgame}`).expect(404, { message: 'Game Not Found' })
  })

  it('Should return 404 and not found message While Delete', async () => {
    await request(app).delete(`/boardgames/${createdBoardgame}`).expect(404, { message: 'Game Not Found' })
  })

  it('Should return 400 when try to get boardgames with numeric query title', async () => {
    await request(app).get('/boardgames?title=123').expect(400, {
      "errors": [
        {
          "type": "field",
          "value": "123",
          "msg": "Can't be a number",
          "path": "title",
          "location": "query"
        }
      ]
    });
  })
})