import request from 'supertest';

import App from '../../app';
import { StatusCodes } from 'http-status-codes';

const app = new App().init();

describe('Integration. Tutor Routes', () => {
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
    const sutCreateTutor = {
      name: 'Guilherme teste',
      password: '123123',
      phone: '691223891232',
      email: '1gulherm3ee@paidepet.com',
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
      console.log(body);
      expect(body).toEqual({
        message: 'DuplicateFieldError',
        details: expect.arrayContaining([
          'phone must be unique',
          'email must be unique',
        ]),
      });
    });
  });
  describe('Tutor GET route', () => {
    test.skip('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app).get('/tutors').query(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    test.skip('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app).get('/tutors').query(sut);

      expect(statusCode).toBe(StatusCodes.OK);
      expect(body).toHaveProperty('docs');
    });
  });
  describe('Tutor DELETE route', () => {
    test('should return status code 204', async () => {
      const petid = '64c4236ad4e344efb1111e46';
      const tutorid = '64c025e73d7493678bcccc8a';
      // eslint-disable-next-line prettier/prettier
      const {body, statusCode} = await request(app).delete(`/pet/${petid}/tutor/${tutorid}`);
      expect(statusCode).toBe(StatusCodes.NO_CONTENT);
      expect(body).toEqual({});
    });
  });
});
