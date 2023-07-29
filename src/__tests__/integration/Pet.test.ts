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
      const petid = '64c5576f3be063d32def6ab1';
      const tutorid = '64c025e73d7493678bcccc8a';
      const { body, statusCode } = await request(app)
        .delete(`/pet/${petid}/tutor/${tutorid}`)
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });
    test('should return status code 404', async () => {
      const petid = '64c555d6bfb93fb1bdc71fdc';
      const tutorid = '64c025e73d7493678bcccc8a';
      const { body, statusCode } = await request(app)
        .delete(`/pet/${petid}/tutor/${tutorid}`)
        .set('Authorization', `Bearer ${token}`);
      expect(statusCode).toBe(404);
      expect(body).toEqual({
        details: 'Not found Pet',
        message: 'Not Found Error',
      });
    });
  });
});
