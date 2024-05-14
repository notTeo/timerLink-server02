import express from "express";
import * as linkValidator from "./linkValidator";
import * as linkConroller from "./linkController";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.use(authMiddleware.validateToken);

router.get("/", authMiddleware.token, linkConroller.getLinks);

router.post(
  "/new-link",
  authMiddleware.token,
  authMiddleware.validateToken,
  linkValidator.createLink,
  linkConroller.createNewLink
);
router.get("/:linkId", linkValidator.linkIdInParams, linkConroller.getLinkById);
router.delete(
  "/:linkId/delete",
  authMiddleware.token,
  authMiddleware.validateToken,
  linkConroller.deleteLinkById
);

router.post(
  "/:linkId/new-target",
  authMiddleware.token,
  authMiddleware.validateToken,
  linkConroller.createNewTarget
);
router.get(
  "/:linkId/:targetId",
  authMiddleware.token,
  authMiddleware.validateToken,
  linkConroller.getTargetById
);

router.delete(
  "/:linkId/:targetId/delete",
  authMiddleware.token,
  authMiddleware.validateToken,
  linkConroller.deleteTargetById
);
router.put(
  "/:userId/:linkId/:targetId/edit",
  linkConroller.updateTargetById
);

export default router;
