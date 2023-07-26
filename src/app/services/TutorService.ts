import type { ITutor, ITutorPaginate, ITutorResponse } from '../interfaces/ITutor';
import TutorRepository from '../repositories/TutorRepository';
import { isValidObjectId } from 'mongoose';
import NotFoundError from '../errors/NotFoundError';

class TutorService {
  async get(payload: any): Promise<ITutorPaginate> {
    const { page, limit } = payload;
    let validatePage: number;
    let validateLimit: number;

    if (typeof page === 'string') {
      validatePage = Number(page);
    } else {
      validatePage = 1;
    }
    if (typeof limit === 'string') {
      validateLimit = Number(limit);
    } else {
      validateLimit = 10;
    }

    const tutors = await TutorRepository.get(validatePage, validateLimit);

    return tutors;
  }

  async update(id: string, data: ITutor): Promise<ITutorResponse> {
      if(!isValidObjectId(id)){
        throw new NotFoundError('Id not valid')
      }
      const updTutor = await TutorRepository.update(id, data);

      if(!updTutor){
        throw new NotFoundError('Tutor not found');
      }

      return updTutor;
  }
}

export default new TutorService();
