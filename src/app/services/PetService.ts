import type { IPet, IPetResponse } from '../interfaces/IPet';
import TutorRepository from '../repositories/TutorRepository';
import PetRepository from '../repositories/PetRepository';
import NotFoundError from '../errors/NotFoundError';
import { isValidObjectId } from 'mongoose';

class PetService {
  async update(
    petId: string,
    tutorId: string,
    payload: IPet
  ): Promise<IPetResponse> {
    if (!isValidObjectId(tutorId) || !isValidObjectId(petId))
      throw new NotFoundError('Id not valid');

    const query = { _id: tutorId, pets: petId };
    const tutor = await TutorRepository.findTutorOfPet(query);
    if (tutor === null)
      throw new NotFoundError('Not found Tutor or Pet not Exist in Tutor');

    const result = await PetRepository.update(petId, payload);
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }

  async delete(petId: string, tutorId: string): Promise<IPetResponse> {
    if (!isValidObjectId(tutorId) || !isValidObjectId(petId))
      throw new NotFoundError('Id not valid');

    const query = { $pull: { pets: petId } };
    console.log('test');
    const tutor = await TutorRepository.deletePet(tutorId, query);
    if (tutor === null) throw new NotFoundError('Not found Tutor');

    const result = await PetRepository.delete(petId);
    console.log('test2');
    if (result === null) throw new NotFoundError('Not found Pet');

    return result;
  }
}

export default new PetService();
