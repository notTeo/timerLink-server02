import express from "express";
import * as userValidator from "./user.validator";
import * as userController from "./user.controller";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.get(
  "/users",
  //temoptery route for me to see all the users i have created,
  userController.getAllUsers
);

router.get(
  "/",
  authMiddleware.token,
  authMiddleware.validateToken,
  userController.getUserById
);

router.put(
  "/edit",
  authMiddleware.token,
  authMiddleware.validateToken,
  userValidator.updateUserValidation,
  userController.updateUserById
);

router.delete(
  "/delete",
  authMiddleware.token,
  authMiddleware.validateToken,
  userController.deleteUserbyId
);


export default router;
