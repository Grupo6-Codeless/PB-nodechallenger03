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

  async delete(id: string): Promise<IPetResponse | null> {
    return await PetSchema.findByIdAndDelete(id);
  }
}

export default new PetRepository();
