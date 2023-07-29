/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import PetController from '../../app/controllers/PetController';
import petCreateAndPutValidation from '../../app/middlewares/validations/PetCreateAndPutValidate';
import petPostValidation from '../../app/middlewares/validations/PetPostValidate';

const router = Router();

router.put(
  '/pet/:petId/tutor/:tutorId',
  petCreateAndPutValidation,
  PetController.update
);

router.post(
  '/pet/:tutorId',
  petPostValidation,
  PetController.create
);

export default router;
