import { Request, Response, NextFunction } from "express";
import * as userService from "../../services/user/user.service";
import { sendSuccessResponse } from "../../utils/responses";

interface UserRequest extends Request {
  user?: { [key: string]: any };
}
export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await userService.getAllUsers(res);
    sendSuccessResponse(res, users);
  } catch (e) {
    next(e);
  }
}

export async function createNewUser(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const { username, password, confirmPassword, email } = req.body;
    const createdUser = await userService.createNewUser(username, password, confirmPassword, email);
    sendSuccessResponse(res, createdUser);
  } catch (e) {
    next(e);
  }
}

export async function getUserById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    console.log(userId);
    const user = await userService.getUserById(userId, res);
    sendSuccessResponse(res, user);
  } catch (e) {
    next(e);
  }
}

export async function updateUserById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const { username, password } = req.body;
    await userService.updateUserById(userId, username, password);
    sendSuccessResponse(res, "User got updated ");
  } catch (e) {
    next(e);
  }
}

export async function deleteUserbyId(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    await userService.deleteUserById(userId, res);
    sendSuccessResponse(res, `User deleted`);
  } catch (e) {
    next(e);
  }
}

