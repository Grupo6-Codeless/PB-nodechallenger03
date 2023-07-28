import TutorServiceMock from './TutorService.mock';
import TutorService from '../../app/services/TutorService';
import TutorRepository from '../../app/repositories/TutorRepository';

describe('Unit. Tutor Service', () => {
  describe('Tutor Service.get', () => {
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const TutorGetRepositoryMock = jest
        .spyOn(TutorRepository, 'get')
        .mockReturnValueOnce(TutorServiceMock.TutorGetRepositoryMock());

      const sut = TutorService.get;
      const query = { page: 1, limit: 10 };

      const actual = await sut(query);

      expect(actual).toEqual(TutorServiceMock.TutorGetRepositoryMock());
      expect(TutorGetRepositoryMock).toHaveBeenCalledWith(
        query.page,
        query.limit
      );
    });
  });
  describe('Tutor Service.post', () => {
    test('should return statusCode 202 && all tutors response with request correct', async () => {
      const postTutor = TutorService.post;

      const body = {
        name: 'Guilherme',
        password: '123123',
        phone: '69981212317',
        email: 'guilherme@email.com',
        date_of_birth: '1993-12-12 10:10',
        zip_code: '61760000',
      };

      const tutorPostRepositoryMock = jest
        .spyOn(TutorRepository, 'post')
        .mockReturnValue(TutorServiceMock.post());

      const actual = await postTutor(body);

      expect(actual).toEqual(TutorServiceMock.post());
      expect(tutorPostRepositoryMock).toHaveBeenCalledWith(body);
    });
  });
});
