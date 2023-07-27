import type { PaginateResult } from 'mongoose';
import type { ITutorResponse, ITutor } from '../interfaces/ITutor';
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

  async post(req: ITutor): Promise<ITutor> {
    return await TutorSchema.create(req);
  }
}
export default new TutorRepository();
