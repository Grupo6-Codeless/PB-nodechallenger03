/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router } from 'express';
import PetController from '../../app/controllers/PetController';
// import petCreateAndPutValidation from '../../app/middlewares/validations/PetCreateAndPutValidate';

const router = Router();

router.put('/pet/:petId/tutor/:tutorId', PetController.update);

export default router;
