import PetServiceMock from './PetService.mock';
import TutorServiceMock from './TutorService.mock';
import PetService from '../../app/services/PetService';
import PetRepository from '../../app/repositories/PetRepository';
import TutorRepository from '../../app/repositories/TutorRepository';
import NotFoundError from '../../app/errors/NotFoundError';

describe('Unit. Pet Service', () => {
  describe('Pet Service.get', () => {
    test('should return statusCode 404 && NotfoundTutor with request params incorrect', async () => {
      const sut = PetService.update;
      const body = {
        name: 'Akamaru',
        species: 'dog',
        carry: 'p',
        weight: 10,
        date_of_birth: '1993-12-12 10:10',
      };
      const petId = 'IdNotValid';
      const tutorId = 'IdNotValid';

      try {
        await sut(petId, tutorId, body);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.name).toBe('Not Found Error');
        expect(error.message).toBe('Id not valid');
      }
    });
    test('should return statusCode 404 && NotfoundTutor or PetNotExistTutor errors with request incorrect', async () => {
      jest
        .spyOn(PetRepository, 'update')
        .mockReturnValueOnce(
          PetServiceMock.PetUpdateRepositoryMockRequestCorrect()
        );
      jest
        .spyOn(TutorRepository, 'findTutorOfPet')
        .mockReturnValueOnce(Promise.resolve(null));

      const sut = PetService.update;
      const body = {
        name: 'Akamaru',
        species: 'dog',
        carry: 'p',
        weight: 10,
        date_of_birth: '1993-12-12 10:10',
      };
      const petId = '64a34a8ff0e6d55acba1d5b8';
      const tutorId = '64a32d48df2eaccf95fee709';

      try {
        await sut(petId, tutorId, body);
      } catch (error) {
        expect(error).toBeInstanceOf(NotFoundError);
        expect(error.name).toBe('Not Found Error');
        expect(error.message).toBe('Not found Tutor or Pet not Exist in Tutor');
      }
    });
    test('should return statusCode 200 && updated pet response with request correct', async () => {
      const PetUpdateRepositoryMock = jest
        .spyOn(PetRepository, 'update')
        .mockReturnValueOnce(
          PetServiceMock.PetUpdateRepositoryMockRequestCorrect()
        );
      const TutorFindTutorOfPetRepositoryMock = jest
        .spyOn(TutorRepository, 'findTutorOfPet')
        .mockReturnValueOnce(
          TutorServiceMock.TutorFindTutorOfPetRepositoryMockRequestCorrect()
        );

      const sut = PetService.update;
      const body = {
        name: 'Akamaru',
        species: 'dog',
        carry: 'p',
        weight: 10,
        date_of_birth: '1993-12-12 10:10',
      };
      const petId = '64a34a8ff0e6d55acba1d5b8';
      const tutorId = '64a32d48df2eaccf95fee709';

      const actual = await sut(petId, tutorId, body);

      expect(actual).toEqual(
        PetServiceMock.PetUpdateRepositoryMockRequestCorrect()
      );
      expect(PetUpdateRepositoryMock).toHaveBeenCalledWith(petId, body);
      expect(TutorFindTutorOfPetRepositoryMock).toHaveBeenCalledWith({
        _id: tutorId,
        pets: petId,
      });
    });
  });
});
