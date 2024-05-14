import type { NextFunction, Request, Response } from "express";

export function logRequest(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  console.log(`[${req.method}] ${req.url}`);
  next();
}
