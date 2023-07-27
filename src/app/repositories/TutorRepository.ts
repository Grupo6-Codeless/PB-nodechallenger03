import type { PaginateResult } from 'mongoose';
import type {
  ITutorPasswordResponse,
  ITutorResponse,
} from '../interfaces/ITutor';
import TutorSchema from '../schemas/TutorSchema';
class TutorRepository {
  async get(
    page: number,
    limit: number
  ): Promise<PaginateResult<ITutorResponse>> {
    const options = {
      select: '-password',
      populate: { path: 'pets', model: 'Pet' },
    };
    const result = await TutorSchema.paginate({}, { page, limit, ...options });

    return result;
  }

  async findTutorOfPet(query: {
    _id: string;
    pets: string;
  }): Promise<ITutorResponse | null> {
    return await TutorSchema.findOne(query);
  }

  async getByEmailToAuth(
    email: string
  ): Promise<ITutorPasswordResponse | null> {
    const valid = await TutorSchema.findOne({ email }).select('password');
    return valid;
  }
}

export default new TutorRepository();
