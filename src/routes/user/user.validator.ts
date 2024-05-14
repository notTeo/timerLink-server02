import { body } from "express-validator";

export const createUserValidation = [
  body("name")
    .exists()
    .withMessage("You must provide a name")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be between 4 and 20 characters")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Name must contain only letters and numbers"),
  body("email")
    .exists()
    .withMessage("You must provide a email")
    .isString()
    .withMessage("Email must be a string")
    .isLength({ min: 8, max: 25 })
    .withMessage(
      "Password must be minimum 8 characters long and maximum 25 characters long"
    ),
  body("password")
    .exists()
    .withMessage("You must provide a password")
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 8 })
    .withMessage("Password must be exactly 8 characters long")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Password must contain only letters and numbers"),

  body("confirmPassword")
    .exists()
    .withMessage("You must confirm your password")
    .isString()
    .withMessage("Confirm password must be a string")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
];

export const updateUserValidation = [
  body("username")
    .optional()
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 4, max: 20 })
    .withMessage("Name must be between 4 and 20 characters")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Name must contain only letters and numbers"),
  body("password")
    .optional()
    .isString()
    .withMessage("Password must be a string")
    .isLength({ min: 8, max: 8 })
    .withMessage("Password must be exactly 8 characters long")
    .matches(/^[a-zA-Z0-9]*$/)
    .withMessage("Password must contain only letters and numbers"),
];
