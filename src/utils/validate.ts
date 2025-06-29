import { plainToInstance } from 'class-transformer';
import { validate as classValidate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validate(dtoClass: new () => object) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const instance = plainToInstance(dtoClass, req.body);
    const errors = await classValidate(instance as object);
    if (errors.length) {
      return res.status(400).json(errors);
    }
    req.body = instance;
    next();
  };
}
