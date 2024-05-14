import { body } from "express-validator";

const username = body("username")
  .exists()
  .withMessage("You must provide a username")
  .isString()
  .withMessage("Username must be a string")
  .isLength({ min: 4, max: 20 })
  .withMessage("Username must be between 4 and 20 characters")
  .matches(/^[a-zA-Z0-9]*$/)
  .withMessage("Username must contain only letters and numbers");

const password = body("password")
  .exists()
  .withMessage("You must provide a password")
  .isString()
  .withMessage("Password must be a string")
  .isLength({ min: 8, max: 16 })
  .withMessage("Password must be 8-16 characters long")
  .matches(/^[a-zA-Z0-9]*$/)
  .withMessage("Password must contain only letters and numbers");

const confirmPassword = body("confirmPassword")
  .exists()
  .withMessage("You must provide a confirm password")
  .custom((confirmPassword, { req }) => {
    return confirmPassword === req.body.password;
  })
  .withMessage("Passwords do not match");
const email = body("email")
.exists()
.withMessage("You must provide a email")
.isString()
.withMessage("Email must be a string")
.isLength({ min: 8, max: 25 })
.withMessage(
  "Password must be minimum 8 characters long and maximum 25 characters long"
)

export const login = [username, password];
export const register = [username, password, confirmPassword, email];
