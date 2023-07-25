/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../../app/controllers/TutorController';
import GetValidation from '../../app/middlewares/validations/TutorGetValidate';
import PushValidation from '../../app/middlewares/validations/TutorPushValidate';

const router = Router();

router.get('/tutors', GetValidation, TutorController.get);

router.post('/tutor', PushValidation, TutorController.push);

export default router;
