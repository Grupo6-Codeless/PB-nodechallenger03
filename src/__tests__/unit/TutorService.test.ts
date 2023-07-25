import TutorServiceMock from './TutorService.mock';
import TutorService from '../../app/services/TutorService';
import TutorRepository from '../../app/repositories/TutorRepository';

describe('Unit. Tutor Service', () => {
  describe('Tutor Service.get', () => {
    test('should return statusCode 200 && all tutors response with request correct', async () => {
      const sut = TutorService.get;
      const query = { page: 1, limit: 10 };
      const GetRepositoryMock = jest
        .spyOn(TutorRepository, 'get')
        .mockReturnValueOnce(TutorServiceMock.get());

      const actual = await sut(query);

      expect(actual).toEqual(TutorServiceMock.get());
      expect(GetRepositoryMock).toHaveBeenCalledWith(query.page, query.limit);
    });
  });
});
