import request from 'supertest';

import App from '../../app';

const app = new App().init();

describe('Integration. Tutor Routes', () => {
  const sutCreateTutor = {
    name: 'Teste Testadado',
    password: '1234',
    phone: '6915611809232',
    email: 'testetedasaasasadado8@paidepet.com',
    date_of_birth: '1993-12-12 10:10',
    zip_code: '61760000',
  };
  let idTutor: string;
  describe('Tutor POST route', () => {
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
    test('should return statusCode 200 && tutors response with request correct', async () => {
      const { body, statusCode } = await request(app)
        .post('/tutor')
        .send(sutCreateTutor);

      const { password, ...bodyExpect } = sutCreateTutor;

      expect(statusCode).toBe(200);
      expect(body).toEqual({ _id: body._id, ...bodyExpect });

      idTutor = body._id;
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
  describe('Auth AUTH route', () => {
    test('should return statusCode 400 && Bad Request Error with request incorrect', async () => {
      const sut = { email: 'NÃOEXISTE@paidepet.com', password: 'NÃOEXISTE' };

      const { body, statusCode } = await request(app).post('/auth').send(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'Bad Request Error',
        details: 'Incorrect email or password, try again!',
      });
    });
    test('should return statusCode 200 && token with request correct', async () => {
      const sut = {
        email: sutCreateTutor.email,
        password: sutCreateTutor.password,
      };

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
  describe('Integration. Tutor Routes', () => {
    describe.skip('Tutor DELETE route', () => {
      test('should return status code 204', async () => {
        const id = '64c025e73d7493678bcccc8a';
        const { body, statusCode } = await request(app).delete(`/tutor/${id}`);
        expect(statusCode).toBe(204);
        expect(body).toEqual({});
      });
    });
  });
  describe('Integration. Tutor Routes', () => {
    describe.skip('Tutor DELETE route', () => {
      test('should return status code 400', async () => {
        const id = '64c025e73d7494678bcccc8a';
        const { body, statusCode } = await request(app).delete(`/tutor/${id}`);
        expect(statusCode).toBe(400);
        expect(body).toEqual({});
      });
    });
  });
});
