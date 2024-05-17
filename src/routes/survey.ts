import express from "express";
import { createSurvey, getSurvey } from "../controller/survey";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(createSurvey));
router.get("/", verifyUser, catchAsync(getSurvey));

export default router;
