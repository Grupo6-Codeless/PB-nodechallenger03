/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import PetController from '../../app/controllers/PetController';
import petPutValidation from '../../app/middlewares/validations/PetPutValidate';
import petPatchValidation from '../../app/middlewares/validations/PetPatchValidate';

const router = Router();

router.put(
  '/pet/:petId/tutor/:tutorId',
  petPutValidation,
  PetController.update
);
router.patch(
  '/pet/:petId/tutor/:tutorId',
  petPatchValidation,
  PetController.update
);

router.delete('/pet/:petId/tutor/:tutorId');

export default router;
