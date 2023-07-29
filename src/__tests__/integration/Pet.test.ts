import request from 'supertest';

import App from '../../app';
import { sutCreateTutor } from '../integration/Tutor.test';

const app = new App().init();

describe.skip('Integration. Pet Routes', () => {
  const sutCreatePet = {
    name: 'Akamaru',
    species: 'dog',
    carry: 'p',
    weight: 10,
    date_of_birth: '1993-12-12 10:10',
  };
  let token: string;
  let idTutor: string;
  let idPet: string;

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

  describe('Pet POST route', () => {
    test('should return statusCode 400 && pet response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app)
        .post(`/pet/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'species is required',
          'carry is required',
          'weight is required',
          'date_of_birth is required',
        ],
      });
    });
    test('should return statusCode 200 && pet response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post(`/pet/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(201);
      expect(body).toEqual({ _id: body._id, sutCreatePet });

      idPet = body._id;
    });
    test('should return statusCode 400 && pet response duplicate with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post(`/pet/${idTutor}`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'DuplicateFieldError',
        details: expect.arrayContaining([
          'phone must be unique',
          'email must be unique',
        ]),
      });

      idPet = body._id;
    });
    test('should return statusCode 404 && Not found error with request incorrect', async () => {
      const { body, statusCode } = await request(app)
        .post(`/pet/INVALIDTUTOR`)
        .set('Authorization', `Bearer ${token}`)
        .send(sutCreatePet);

      expect(statusCode).toBe(404);
      expect(body).toEqual({
        message: 'Not Found Error',
        details: 'Id not valid',
      });

      idPet = body._id;
    });
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
