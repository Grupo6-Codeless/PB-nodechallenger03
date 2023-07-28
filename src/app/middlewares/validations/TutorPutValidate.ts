import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction): void => {
    try {
        const Tutorschema = Joi.object ({
            name: Joi.string().required().trim(),
            phone: Joi.string().required().trim(),
            email: Joi.string().required().trim(),
            date_of_birth: Joi.date().required(),
            zip_code: Joi.string().required().trim(),
        });

        const { error } = Tutorschema.validate(req.body, {
            abortEarly: false,
        });

        if (!(error === undefined)) throw error;
        next();
    } catch (errors) {
        const errorsDetails: string[] = [];
        for (const error of errors.details) {
            errorsDetails.push(error.message.replace(/\\/g, '').replace(/"/g, ''));
        }
        res.status(400).json({
            message: errors.name,
            details: errorsDetails,
        });
    }
}