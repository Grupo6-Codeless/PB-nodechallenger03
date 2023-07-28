import type { PaginateResult } from 'mongoose';
import type {
  ITutorPasswordResponse,
  ITutorResponse,
  ITutor,
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

  async update(id: string, data: ITutor): Promise<ITutorResponse | null> {
    return await TutorSchema.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    })
      .select('-_id')
      .exec();
  }

  async getByEmailToAuth(
    email: string
  ): Promise<ITutorPasswordResponse | null> {
    return await TutorSchema.findOne({ email }).select('password _id').lean();
  }

  async post(req: ITutor): Promise<ITutor> {
    return await TutorSchema.create(req);
  }
}
export default new TutorRepository();
