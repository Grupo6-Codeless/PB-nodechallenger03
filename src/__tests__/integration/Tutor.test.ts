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
    test('should return statusCode 400 && ValidateError response with query required', async () => {
      const sut = {
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
      };

      const { body, statusCode } = await request(app.init())
        .post('/tutor')
        .query(sut);
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
  });
});
