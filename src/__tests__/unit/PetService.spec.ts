import PetServiceMock from './PetService.mock';
import TutorServiceMock from './TutorService.mock';
import PetService from '../../app/services/PetService';
import PetRepository from '../../app/repositories/PetRepository';
import TutorRepository from '../../app/repositories/TutorRepository';
import NotFoundError from '../../app/errors/NotFoundError';

describe('Unit. Pet Service', () => {
  describe('Pet Service.update', () => {
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
  describe('Pet Service.delete', () => {
    test('should return statusCode 202 && delete pet response with request correct', async () => {
      jest
        .spyOn(TutorRepository, 'deletePet')
        .mockReturnValueOnce(PetServiceMock.deletePet());
      const PetDeleteRepositoryMock = jest
        .spyOn(PetRepository, 'delete')
        .mockReturnValueOnce(PetServiceMock.delete());

      const sut = PetService.delete;
      const petid = '64c4140f520d4b5b58b60d9f';
      const tutorid = '64c025e73d7493678bcccc8a';

      const actual = await sut(petid, tutorid);

      expect(actual).toEqual(PetServiceMock.delete());
      expect(PetDeleteRepositoryMock).toHaveBeenCalledWith(petid);
    });
    test('should return statusCode 400', async () => {
      jest
        .spyOn(TutorRepository, 'deletePet')
        .mockReturnValueOnce(PetServiceMock.deletePet());
      const PetDeleteRepositoryMock = jest
        .spyOn(PetRepository, 'delete')
        .mockReturnValueOnce(PetServiceMock.delete());

      const sut = PetService.delete;
      const petid = '64c424c75ffde056dbe3eb95';
      const tutorid = '64c025e73d7493674bcccc8a';
      const actual = await sut(petid, tutorid);

      expect(actual).toEqual(PetServiceMock.deletePet());
      expect(PetDeleteRepositoryMock).toHaveBeenCalledWith(petid);
    });
  });
});
