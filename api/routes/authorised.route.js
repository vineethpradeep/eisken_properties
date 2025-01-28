import express from "express";
import {
  authUser,
  authAdminUser,
} from "../controllers/authorised.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/auth-user", verifyToken, authUser);
router.get("/auth-admin-user", authAdminUser);

export default router;
