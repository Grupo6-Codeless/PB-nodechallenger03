import request from 'supertest';

import App from '../../app';
import { sutCreateTutor } from '../integration/Tutor.test';

const app = new App().init();

describe('Integration. Pet Routes', () => {
  let token: string;
  let idTutor: string;
  beforeAll(async () => {
    const post = await request(app).post('/tutor').send(sutCreateTutor);
    idTutor = post.body._id;

    const auth = await request(app).post('/auth').send({
      email: sutCreateTutor.email,
      password: sutCreateTutor.password,
    });
    token = auth.body.access_token;
  });

  afterAll(async () => {
    await request(app)
      .delete(`/tutor/${idTutor}`)
      .set('Authorization', `Bearer ${token}`);
  });
  describe.skip('Pet DELETE route', () => {
    test('should return status code 204', async () => {
      const petid = '64c4236ad4e344efb1111e46';
      const tutorid = '64c025e73d7493678bcccc8a';
      const { body, statusCode } = await request(app).delete(
        `/pet/${petid}/tutor/${tutorid}`
      );
      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });
  });
});
