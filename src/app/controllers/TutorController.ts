import type { Request, Response } from 'express';
import TutorService from '../services/TutorService';

class TutorController {
  async post(req: Request, res: Response): Promise<Response> {
    try {
      return res.status(201).json();
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default new TutorController();
