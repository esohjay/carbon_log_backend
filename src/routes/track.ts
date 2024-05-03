import express from "express";
import { addActivity, addTravelActivity, getTrack } from "../controller/track";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(addActivity));
router.post("/travel", verifyUser, catchAsync(addTravelActivity));
router.get("/", verifyUser, catchAsync(getTrack));

export default router;
