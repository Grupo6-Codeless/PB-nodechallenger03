import { genSalt, hash } from 'bcrypt';
import { isValidObjectId } from 'mongoose';

import type {
  ITutorPaginate,
  ITutor,
  ITutorResponse,
} from '../interfaces/ITutor';
import TutorRepository from '../repositories/TutorRepository';
import NotFoundError from '../errors/NotFoundError';

class TutorService {
  async post(req: ITutor): Promise<ITutorResponse> {
    const salt = await genSalt(10);
    const hashpassword = await hash(req.password, salt);
    req.password = hashpassword;

    const result = await TutorRepository.post(req);

    result.password = undefined;
    result.pets = undefined;

    return result;
  }

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
    if (!isValidObjectId(id)) {
      throw new NotFoundError('Id not valid');
    }
    const updTutor = await TutorRepository.update(id, data);

    if (updTutor == null) {
      throw new NotFoundError('Tutor not found');
    }

    return updTutor;
  }

  async deleteTutorById(id: string): Promise<ITutorResponse | null> {
    const deletedTutor = await TutorRepository.delete(id);
    if (deletedTutor == null) throw new NotFoundError('Not Tutor exists');

    return deletedTutor;
  }
}

export default new TutorService();
