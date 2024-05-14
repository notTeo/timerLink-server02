import { Request, Response, NextFunction } from "express";
import * as authService from "../../services/auth/auth.service";
import { sendSuccessResponse } from "../../utils/responses";
import { IUserPayload } from "../../models";

interface UserRequest extends Request {
  user?: { [key: string]: any };
}

export async function login(
  req: Request<unknown, unknown, { username?: string; password?: string }>,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password } = req.body;
    const token = await authService.login(username, password);
    sendSuccessResponse(res, { token });
  } catch (e) {
    next(e);
  }
}

export async function register(
  req: Request<
    unknown,
    unknown,
    Partial<IUserPayload> & { confirmPassword?: string; email?: string }
  >,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, password, email, confirmPassword } = req.body;

    const user = await authService.register(
      username,
      password,
      email,
      confirmPassword
    );
    sendSuccessResponse(res, { user });
  } catch (e) {
    next(e);
  }
}

export async function resetPassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function logout(
  req: UserRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    await authService.logout(token);
    sendSuccessResponse(res, "user logged out");
  } catch (e) {
    next(e);
  }
}

export async function changePassword(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function verifyEmail(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}

export async function verifyOTP(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    sendSuccessResponse(res, {});
  } catch (e) {
    next(e);
  }
}
