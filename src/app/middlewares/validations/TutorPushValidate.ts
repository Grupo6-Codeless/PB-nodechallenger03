import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';
import { StatusCodes } from 'http-status-codes';

export default (req: Request, res: Response, next: NextFunction): void => {
  try {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      phone: Joi.string().min(7).required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        .exist()
        .required(),
      password: Joi.string().exist().required(),
      date_of_birth: Joi.date().required(),
      zip_code: Joi.string().min(7).required(),
      pets: Joi.forbidden(),
    });

    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });

    if (!(error === undefined)) throw error;

    next();
  } catch (errors) {
    const errorsDetails: string[] = [];
    for (const error of errors.details) {
      errorsDetails.push(error.message.replace(/\\/g, '').replace(/"/g, ''));
    }
    res.status(StatusCodes.BAD_REQUEST).json({
      message: errors.name,
      details: errorsDetails,
    });
  }
};