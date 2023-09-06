import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const createTodoValidation = [
  check("todo", "todo cannot be empty").trim().escape().not().isEmpty(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: errors.array() });
    next();
  },
];

export const updateTodoValidation = [
  check("todo", "todo cannot be empty").trim().escape().not().isEmpty(),

  check("isCompleted", "isCompleted should be a boolean")
    .trim()
    .escape()
    .isBoolean(),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: errors.array() });
    next();
  },
];
