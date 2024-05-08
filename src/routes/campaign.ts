import express from "express";
import {
  createCampaign,
  joinCampaign,
  leaveCampaign,
  conversation,
} from "../controller/campaign";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser, verifyAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(createCampaign));
router.put("/:campaignId/join", verifyUser, catchAsync(joinCampaign));
router.put("/:campaignId/leave", verifyUser, catchAsync(leaveCampaign));
router.post("/:campaignId/conversation", verifyUser, catchAsync(conversation));

export default router;
