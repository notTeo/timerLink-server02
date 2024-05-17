import { Request, Response, NextFunction } from "express";
import * as linkService from "../../services/link/link.service";
import { sendSuccessResponse } from "../../utils/responses";

interface UserRequest extends Request {
  user?: { [key: string]: any };
}
export async function getLinks(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const links = await linkService.getLinksByUserId(userId);
    sendSuccessResponse(res, links);
  } catch (e) {
    next(e);
  }
}

export async function createNewLink(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const name = req.body.name;
    const newLink = await linkService.createNewLink(userId, name);
    sendSuccessResponse(res, newLink);
  } catch (e) {
    next(e);
  }
}

export async function getLinkById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    const link = await linkService.getLinkById(userId, linkId);
    sendSuccessResponse(res, link);
  } catch (e) {
    next(e);
  }
}

export async function deleteLinkById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    await linkService.deleteLinkById(userId, linkId);
    sendSuccessResponse(res, "link deleted");
  } catch (e) {
    next(e);
  }
}

export async function createNewTarget(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    const url = req.body.url;
    const startDate = req.body.startDate;
    const expireDate = req.body.expireDate;
    const newTarget = await linkService.createNewTarget(
      userId,
      linkId,
      url,
      expireDate,
      startDate
    );
    sendSuccessResponse(res, newTarget);
  } catch (e) {
    next(e);
  }
}

export async function getTargetById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    const target = await linkService.getTargetById(
      userId,
      linkId,
      targetId, 
    );
    sendSuccessResponse(res, target);
  } catch (e) {
    next(e);
  }
}

export async function deleteTargetById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    await linkService.deleteTargetById(userId, linkId, targetId);
    sendSuccessResponse(res, "target deleted");
  } catch (e) {
    next(e);
  }
}

export async function updateTargetById(
  req: UserRequest,
  res: Response,
  next: NextFunction,
) {
  try {
    const userId = req.user._id;
    const linkId = req.params.linkId;
    const targetId = req.params.targetId;
    const targetBody = req.body;
    const updatedTarget = await linkService.updateTargetById(
      userId,
      linkId,
      targetId,
      targetBody,
    );
    sendSuccessResponse(res, updatedTarget);
  } catch (e) {
    next(e);
  }
}
