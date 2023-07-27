/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../../app/controllers/TutorController';
import GetValidation from '../../app/middlewares/validations/TutorGetValidate';
import PutValidation from '../../app/middlewares/validations/TutorPutValidate';

const router = Router();

router.get('/tutors', GetValidation, TutorController.get);


router.put('/tutor/:id', PutValidation, TutorController.update);

router.patch('/tutor/:id', TutorPatchValidation, TutorController.update);

export default router;
