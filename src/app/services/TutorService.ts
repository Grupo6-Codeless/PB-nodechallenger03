/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import type { ITutorPaginate } from '../interfaces/ITutor';
import TutorRepository from '../repositories/TutorRepository';

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
}

export default new TutorService();
