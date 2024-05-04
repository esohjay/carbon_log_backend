import express from "express";
import { addAction, getActions } from "../controller/action";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser, verifyAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", catchAsync(addAction));
router.get("/", catchAsync(getActions));

export default router;
