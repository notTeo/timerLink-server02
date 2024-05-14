import { header, ValidationChain } from "express-validator";
import { Request, Response, NextFunction } from 'express';

import jwt from "jsonwebtoken";
import { blacklist } from "../models/blacklist";

interface UserRequest extends Request {
  user?: { key: string }; 
}

export const token: ValidationChain[] = [
  header("authorization")
    .exists()
    .withMessage("Please provide a token")
    .custom((header) => {
      const token = header?.split("Bearer ")[1];
      return !!token;
    })
    .withMessage("Invalid token"),
];

export async function validateToken(req: UserRequest, res:Response, next:NextFunction) {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (blacklist.has(token)) {
      return res.status(401).json({ message: 'Unauthorized. Token has been invalidated' });
    }
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({ message: "Unauthorized" });
  }
}

