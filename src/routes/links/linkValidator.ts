import { body, param } from "express-validator";

export const createLink = body("name")
  .exists()
  .withMessage("You must provide a name")
  .isString()
  .withMessage("Username must be a string")
  .isLength({ min: 4, max: 20 })
  .withMessage("Username must be between 4 and 20 characters")
  .matches(/^[a-zA-Z0-9]*$/)
  .withMessage("Username must contain only letters and numbers");

export const linkIdInParams = param("linkId")
  .exists()
  .withMessage("You must provide a id");

export const targetBody = [
  body("url")
    .exists()
    .withMessage("You must provide a url")
    .isString()
    .withMessage("Url must be a string"),

  body("startDate").optional().isString().withMessage("Date must be a string"),
  body("expireDate").optional().isString().withMessage("Date must be a string"),
];
