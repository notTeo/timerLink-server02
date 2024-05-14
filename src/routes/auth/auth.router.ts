import express from "express";
import * as errorMiddleware from "../../middleware/error.middleware";
import * as validatorMiddleware from "../../middleware/validator.middleware";
import * as authController from "./auth.controller";
import * as authValidator from "./auth.validator";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.post(
  "/login",
  authValidator.login,
  validatorMiddleware.validate,
  authController.login,
);

router.post(
  "/register",
  authValidator.register,
  validatorMiddleware.validate,
  authController.register,
);

router.post(
  "/logout",
  authMiddleware.token,
  authMiddleware.validateToken,
  authController.logout
);

router.post(
  "/reset-password",
  errorMiddleware.notImplemented,
  authController.resetPassword,
);

router.post(
  "/change-password",
  errorMiddleware.notImplemented,
  authController.changePassword,
);

router.post(
  "/verify-email",
  errorMiddleware.notImplemented,
  authController.verifyEmail,
);

router.post(
  "/verify-otp",
  errorMiddleware.notImplemented,
  authController.verifyOTP,
);

export default router;
