/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import TutorController from '../../app/controllers/TutorController';
import GetValidation from '../../app/middlewares/validations/TutorGetValidate';
import AuthVerify from '../../app/middlewares/AuthVerify';
import PushValidation from '../../app/middlewares/validations/TutorPushValidate';
import PutValidation from '../../app/middlewares/validations/TutorPutValidate';
import PatchValidation from '../../app/middlewares/validations/PetPatchValidate';

const router = Router();

router.get('/tutors', AuthVerify, GetValidation, TutorController.get);

router.post('/tutor', PushValidation, TutorController.push);

router.put('/tutor/:id', PutValidation, TutorController.update);

router.patch('/tutor/:id', PatchValidation, TutorController.update);

export default router;
