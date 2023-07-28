import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

import App from '../../app';

const app = new App();

describe('Integration. Tutor Routes', () => {
  describe('Tutor GET route', () => {
    test('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app.init())
        .get('/tutors')
        .query(sut);

      expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app.init())
        .get('/tutors')
        .query(sut);

      expect(statusCode).toBe(StatusCodes.OK);
      expect(body).toHaveProperty('docs');
    });
  });
  describe('Tutor POST route', () => {
    test('should return statusCode 400 && tutors response with request required', async () => {
      const sut = {};

      const { body, statusCode } = await request(app.init())
        .post('/tutor')
        .send(sut);
      expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(body).toEqual({
        message: 'ValidationError',
        details: [
          'name is required',
          'phone is required',
          'email is required',
          'password is required',
          'date_of_birth is required',
          'zip_code is required',
          'pets is required',
        ],
      });
    });
    test('should return statusCode 200 && tutors response with request correct', async () => {
      const sut = {
        name: 'Guilherme teste',
        password: '123123',
        phone: '1199135590',
        email: '11emailtest@email.com',
        date_of_birth: '1993-12-12 10:10',
        zip_code: '61760000',
        pets: [],
      };
      const { body, statusCode } = await request(app.init())
        .post('/tutor')
        .send(sut);

      console.log(body, statusCode);
      expect(statusCode).toBe(StatusCodes.OK);
      expect(body).toEqual({
        name: 'Guilherme teste',
        phone: '1199135590',
        email: '11emailtest@email.com',
        date_of_birth: '1993-12-12 10:10',
        zip_code: 61760000,
        _id: body._id,
      });
    });
    test('should return statusCode 400 && tutors response with tutor already exists', async () => {
      const sut = {
        name: 'Guilherme teste 4',
        password: '123123',
        phone: '18299634319661',
        email: '1email6@email.com',
        date_of_birth: '1993-12-12 10:10',
        zip_code: '61760000',
        pets: [],
      };
      const { body, statusCode } = await request(app.init())
        .post('/tutor')
        .send(sut);
      expect(statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(body).toEqual({
        details: ['phone must be unique', 'email must be unique'],
        message: 'DuplicateFieldError',
      });
    });
  });
});
