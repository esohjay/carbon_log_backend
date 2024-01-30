import express from "express";
import { createUser, getUser } from "../controller/user";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(createUser));
router.get("/", verifyUser, catchAsync(getUser));

export default router;
