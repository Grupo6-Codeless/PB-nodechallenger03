import type { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export default (req: Request, res: Response, next: NextFunction): void => {
    try {
        const Tutorschema = Joi.object ({
            name: Joi.string().optional().trim(),
            phone: Joi.string().optional().trim(),
            email: Joi.string().optional().trim(),
            date_of_birth: Joi.date().optional(),
            zip_code: Joi.string().optional().trim(),
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