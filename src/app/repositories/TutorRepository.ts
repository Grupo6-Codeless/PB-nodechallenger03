import type { PaginateResult } from 'mongoose';
import type { ITutorResponse } from '../interfaces/ITutor';
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
}

export default new TutorRepository();
