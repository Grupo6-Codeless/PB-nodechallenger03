import TutorServiceMock from './TutorService.mock';
import TutorService from '../../app/services/TutorService';
import TutorRepository from '../../app/repositories/TutorRepository';
import NotFoundError from '../../app/errors/NotFoundError';

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

describe('Tutor Service.put', () => {
  test('should return statusCode 200 && update tutor data and return the updated tutor with request correct', async () => {
    const IdTutor = '64a32d48df2eaccf95fee709';
    const sut = TutorService.update;
    
    const body = {
      name: 'Geovanna',
      password: '123456',
      phone: '85999323895',
      email: 'geovanna@paidepet.com',
      date_of_birth: '1993-12-12 10:10',
      zip_code: 61760000,
      pets: [],
    };
    const tutorPutRepositoryMock = jest
    .spyOn(TutorRepository, 'update')
    .mockReturnValueOnce(
      TutorServiceMock.put()
    );
    
    const actual = await sut(IdTutor, body);

    expect(actual).toEqual(
      TutorServiceMock.put()
    );
    expect(tutorPutRepositoryMock).toHaveBeenCalledWith(IdTutor, body)
  });

  test('Should return a 404 && NotFoundTutor erros with invalid requests', async () => {
    jest.spyOn(TutorRepository, 'update')
    .mockReturnValueOnce(
      TutorServiceMock.put()
    );
    const sut = TutorService.update;
    const IdTutor = '64c167f9e96b9c0b1ba289d8';

    const body = {
      name: 'Geovanna',
      password: '123456',
      phone: '85999323895',
      email: 'geovanna@paidepet.com',
      date_of_birth: '1993-12-12 10:10',
      zip_code: 61760000,
      pets: [],
    };

    try {
      await sut(IdTutor, body);
    } catch (error){
      expect(error).toBeInstanceOf(NotFoundError);
      expect(error.name).toBe('Not Found Error');
      expect(error.message).toBe('Tutor not found');
    }
  });
});
