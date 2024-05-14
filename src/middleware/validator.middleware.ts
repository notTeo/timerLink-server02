import type { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";

export function validate(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0]?.msg;
      const validation = errors
        .array()
        .reduce(
          (a, c: FieldValidationError) => ({ ...a, [c.path]: c.msg }),
          {},
        );

      const error: any = new Error(firstError);
      error.validation = validation;
      error.status = 400;
      throw error;
    }
    next();
  } catch (e) {
    next(e);
  }
}
