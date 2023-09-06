import { Request, Response, NextFunction } from "express";
import { check, validationResult } from "express-validator";

export const registerValidation = [
  check("name", "name can not be empty and can only contain alphabets")
    .trim()
    .escape()
    .not()
    .isEmpty()
    .isAlpha(),

  check("email", "Invalid Email address").trim().not().isEmpty().isEmail(),

  check("password", "").trim().not().isEmpty().isLength({ min: 4 }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: errors.array() });
    next();
  },
];

export const loginValidation = [
  check("email", "Invalid Email address").trim().not().isEmpty().isEmail(),

  check("password", "password should have atleat 4 character")
    .trim()
    .not()
    .isEmpty()
    .isLength({ min: 4 }),

  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(422).json({ message: errors.array() });
    next();
  },
];
