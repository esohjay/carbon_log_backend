import express from "express";
import {
  addAction,
  getActions,
  logAction,
  getLoggedAction,
} from "../controller/action";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser, verifyAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", catchAsync(addAction));
router.get("/", catchAsync(getActions));
router.post("/log", verifyUser, catchAsync(logAction));
router.get("/loggedAction", verifyUser, catchAsync(getLoggedAction));

export default router;
