/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../app/controllers/TutorController';
// import GetValidation from '../app/middlewares/validations/TutorGetValidate';

const router = Router();

router.get('/tutors', TutorController.get);

export default router;
