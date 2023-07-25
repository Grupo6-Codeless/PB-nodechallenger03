import request from 'supertest';

import App from '../../app';

const app = new App();

describe('Integration. Tutor Routes', () => {
  describe('Tutor GET route', () => {
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
