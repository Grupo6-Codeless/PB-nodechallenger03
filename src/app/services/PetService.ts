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

  async post(payload: IPet, tutorId: string): Promise<IPetResponse> {
    if(!isValidObjectId(tutorId)){
      throw new NotFoundError('Invalid id');
    }

    const tutor = await TutorRepository.findTutorById(tutorId);
    if (tutor === null) {
      throw new NotFoundError('Tutor not found');
    }

    const result = await PetRepository.post(payload);
    const query = { $push: { pets: [result._id] }};

    await TutorRepository.updatePet(tutorId, query);
   
    return result;
  }
}

export default new PetService();
