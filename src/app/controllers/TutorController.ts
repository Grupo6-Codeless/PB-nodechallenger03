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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const result = await TutorService.update(id, req.body);

      return res.status(200).json({result, message: 'Tutor updated!'});
    } catch (error) {
      if(!(error.statusCode === undefined)) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(500).json(error);
    }
  }
}

export default new TutorController();
