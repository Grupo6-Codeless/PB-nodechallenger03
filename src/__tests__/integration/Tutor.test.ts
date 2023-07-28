import request from 'supertest';

import App from '../../app';
import { StatusCodes } from 'http-status-codes';

const app = new App().init();

describe('Integration. Tutor Routes', () => {
  describe('Tutor GET route', () => {
    test('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app).get('/tutors').query(sut);

      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app).get('/tutors').query(sut);

      expect(statusCode).toBe(StatusCodes.OK);
      expect(body).toHaveProperty('docs');
    });
  });
  describe('Tutor DELETE route', () => {
    test('should return status code 204', async () => {
      const petid = '64c42513d4e344efb1111e48';
      const tutorid = '64c025e73d7493678bcccc8a';
      // eslint-disable-next-line prettier/prettier
      const {body, statusCode} = await request(app).delete(`/pet/${petid}/tutor/${tutorid}`);
      expect(statusCode).toBe(StatusCodes.NO_CONTENT);
      expect(body).toEqual({});
    });
  });
});
