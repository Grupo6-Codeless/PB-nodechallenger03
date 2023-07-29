import request from 'supertest';

import App from '../../app';

const app = new App().init();

describe('Integration. Tutor Routes', () => {
  describe.skip('Tutor POST route', () => {
    test('should return statusCode 400 && tutors response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app).post('/tutor').send(sut);
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'phone is required',
          'email is required',
          'password is required',
          'date_of_birth is required',
          'zip_code is required',
        ],
      });
    });
    const sutCreateTutor = {
      name: 'Teste Testadado',
      password: '1234',
      phone: '69156767359232',
      email: 'testetestadado4@paidepet.com',
      date_of_birth: '1993-12-12 10:10',
      zip_code: '61760000',
    };
    test('should return statusCode 200 && tutors response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post('/tutor')
        .send(sutCreateTutor);

      const { password, ...bodyExpect } = sutCreateTutor;

      expect(statusCode).toBe(200);
      expect(body).toEqual({ _id: body._id, ...bodyExpect });
    });
    test('should return statusCode 400 && tutors response with tutor already exists', async () => {
      const { body, statusCode } = await request(app)
        .post('/tutor')
        .send(sutCreateTutor);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'DuplicateFieldError',
        details: expect.arrayContaining([
          'phone must be unique',
          'email must be unique',
        ]),
      });
    });
  });
  let token: string;
  describe('Auth POST route', () => {
    test('should return statusCode 200 && token with request correct', async () => {
      const sut = { email: 'testetestadado2@paidepet.com', password: '1234' };

      const { body, statusCode } = await request(app).post('/auth').send(sut);
      token = body.access_token;

      expect(statusCode).toBe(201);
      expect(body).toHaveProperty('access_token');
    });
  });
  describe('Tutor GET route', () => {
    test('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app)
        .get('/tutors')
        .set('Authorization', `Bearer ${token}`)
        .query(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app)
        .get('/tutors')
        .set('Authorization', `Bearer ${token}`)
        .query(sut);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('docs');
    });
  });
});
