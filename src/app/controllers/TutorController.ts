import type { Request, Response } from 'express';
import TutorService from '../services/TutorService';

class TutorController {
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.get(req.query);

      return res.status(200).json(result);
    } catch (error) {
      if (!(error.statusCode === undefined)) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(500).json(error);
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params; 

    try {
      const deletedTutor = await TutorService.deleteTutorById(id);
      if (deletedTutor) {
       
        return res.status(204).json();
      } else {
       
        return res.status(404).json({ error: 'Tutor not found.' });
      }
    } catch (error) {
      console.error('Error deleting tutor:', error);
      
      return res.status(500).json({ error: 'Error deleting tutor.' });
    }
  }
}
export default new TutorController();
