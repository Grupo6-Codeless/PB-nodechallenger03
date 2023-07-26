import type { ITutorPaginate, ITutorResponse } from '../interfaces/ITutor';
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

  async deleteTutorById(id: string): Promise<ITutorResponse | null> {
    try {
      const deletedTutor = await TutorRepository.delete({ _id: id });
      return deletedTutor;
    } catch (error) {
      console.error('Erro ao deletar o tutor:', error);
      throw new Error('Erro ao deletar o tutor.');
    }
  }
  }



export default new TutorService();
