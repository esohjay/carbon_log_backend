import express from "express";
import { addActivity } from "../controller/track";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(addActivity));

export default router;
