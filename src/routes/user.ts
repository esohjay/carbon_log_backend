import express from "express";
import {
  createUser,
  getUser,
  updatePassword,
  updateUser,
  deleteUser,
} from "../controller/user";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser } from "../middleware/auth";

const router = express.Router();

router.post("/", catchAsync(createUser));
router.put("/edit", verifyUser, catchAsync(updateUser));
router.put("/edit-password", verifyUser, catchAsync(updatePassword));
router.get("/", verifyUser, catchAsync(getUser));
router.delete("/", verifyUser, catchAsync(deleteUser));

export default router;
