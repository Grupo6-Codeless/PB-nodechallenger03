/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type {
  ITutorPaginate,
  ITutor,
  ITutorResponse,
} from '../interfaces/ITutor';

import TutorRepository from '../repositories/TutorRepository';
import bcrypt from 'bcrypt';

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

  async post(req: ITutor): Promise<ITutorResponse> {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.password, salt);
    req.password = hash;

    const result = await TutorRepository.post(req);
    result.password = undefined;
    result.pets = undefined;
    return result;
  }
}

export default new TutorService();
