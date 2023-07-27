/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../../app/controllers/TutorController';
import GetValidation from '../../app/middlewares/validations/TutorGetValidate';
import AuthVerify from '../../app/middlewares/AuthVerify';

const router = Router();

router.get('/tutors', AuthVerify, GetValidation, TutorController.get);

export default router;
