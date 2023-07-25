import type { IPet, IPetResponse } from '../interfaces/IPet';
import PetSchema from '../schemas/PetSchema';

class PetRepository {
  async update(id: string, payload: IPet): Promise<IPetResponse | null> {
    return await PetSchema.findByIdAndUpdate(id, payload, {
      returnDocument: 'after',
      runValidators: true,
    })
      .select('-_id')
      .exec();
  }
}

export default new PetRepository();
