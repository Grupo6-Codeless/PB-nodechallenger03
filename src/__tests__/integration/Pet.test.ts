import request from 'supertest';

import App from '../../app';

const app = new App().init();

describe('Integration. Pet Routes', () => {
  describe('Pet DELETE route', () => {
    test('should return status code 204', async () => {
      const petid = '64c4236ad4e344efb1111e46';
      const tutorid = '64c025e73d7493678bcccc8a';
      const { body, statusCode } = await request(app).delete(
        `/pet/${petid}/tutor/${tutorid}`
      );
      expect(statusCode).toBe(204);
      expect(body).toEqual({});
    });
  });
});
