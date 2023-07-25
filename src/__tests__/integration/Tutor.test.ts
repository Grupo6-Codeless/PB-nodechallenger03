import request from 'supertest';

import App from '../../app';

const app = new App();

describe('Integration. Tutor Routes', () => {
  describe('Tutor GET route', () => {
    it('should return statusCode 400 && ValidateError response with query incorrect', async () => {
      const sut = { page: 'ValidateError', limit: 'ValidateError' };

      const { body, statusCode } = await request(app.init())
        .get('/tutors')
        .query(sut);

      console.log(body);
      expect(statusCode).toBe(400);
      expect(body).toEqual({
        message: 'ValidationError',
        details: ['page must be a number', 'limit must be a number'],
      });
    });
    it('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = { page: 2, limit: 10 };

      const { body, statusCode } = await request(app.init())
        .get('/tutors')
        .query(sut);

      expect(statusCode).toBe(200);
      expect(body).toHaveProperty('docs');
    });
  });
});
