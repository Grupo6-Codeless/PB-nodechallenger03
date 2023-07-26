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
});
