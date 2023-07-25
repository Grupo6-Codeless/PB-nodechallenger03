import type { Request, Response } from 'express';
import TutorService from '../services/TutorService';
import { StatusCodes } from 'http-status-codes';

class TutorController {
  async get(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.get(req.query);

      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (!(error.statusCode === undefined)) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async push(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.push(req.body);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (!(error.statusCode === undefined)) {
        return res.status(error.statusCode).json({
          message: error.name,
          details: error.message,
        });
      }
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }
}

export default new TutorController();
