import type { Request, Response } from 'express';
import TutorService from '../services/TutorService';
import { StatusCodes } from 'http-status-codes';
import DuplicateKeyError from '../errors/DuplicateKeyError';

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
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(error);
    }
  }

  async push(req: Request, res: Response): Promise<Response> {
    try {
      const result = await TutorService.post(req.body);
      return res.status(StatusCodes.OK).json(result);
    } catch (error) {
      if (error.name === 'ValidationError') {
        return res
          .status(400)
          .json(DuplicateKeyError(Object.keys(error.errors)));
      }
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
