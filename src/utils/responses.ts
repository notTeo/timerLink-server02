import { Response } from "express";

export function sendSuccessResponse(res: Response, data: unknown): void {
  console.log("[SUCCESS]:" , data)
  res.send({ success: true, data });
}

export function sendErrorResponse(
  res: Response,
  message: any,
  httpCode?: number
): void {
  console.log("[ERROR]:", message)
  res.status(httpCode ?? 500);
  res.send({ success: false, error: message });
}
