import TutorServiceMock from './TutorService.mock';
import TutorService from '../../app/services/TutorService';
import TutorRepository from '../../app/repositories/TutorRepository';

describe('Unit. Tutor Controller', () => {
  describe('Tutor Controller.get', () => {
    it('should return statusCode 200 && all tutors response with request correct', async () => {
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

  describe('Tutor Controller.post', () => {
    test('should return statusCode 202 && all tutors response with request correct', async () => {
      const postTutor = TutorService.post;

      const body = {
        name: 'Guilherme',
        password: '123123',
        phone: '69981212317',
        email: 'antonio@paidepet.com',
        date_of_birth: '1993-12-12 10:10',
        zip_code: 61760000,
        pets: [],
      };

      const tutorPostRepositoryMock = jest
        .spyOn(TutorRepository, 'post')
        .mockReturnValue(TutorServiceMock.post());

      const actual = await postTutor(body);

      expect(actual).toEqual(TutorServiceMock.post);
      expect(tutorPostRepositoryMock).toHaveBeenCalledWith(
        body.name,
        body.password,
        body.phone,
        body.email,
        body.date_of_birth,
        body.zip_code,
        body.pets
      );
    });
  });
});
