import express from "express";
import { createSurvey } from "../controller/survey";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(createSurvey));

export default router;
