import express from "express";
import {
  addActivity,
  addTravelActivity,
  getTrack,
  deleteActivity,
} from "../controller/track";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(addActivity));
router.post("/travel", verifyUser, catchAsync(addTravelActivity));
router.get("/", verifyUser, catchAsync(getTrack));
router.delete("/", verifyUser, catchAsync(deleteActivity));

export default router;
