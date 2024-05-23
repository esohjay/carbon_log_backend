import express from "express";
import {
  createCampaign,
  joinCampaign,
  leaveCampaign,
  conversation,
  getCampaigns,
  getJoinedCampaigns,
  getCampaign,
  getConversation,
  updateCampaign,
  deleteCampaign,
} from "../controller/campaign";
import { catchAsync } from "../middleware/catchAsync";
import { verifyUser, verifyAdmin } from "../middleware/auth";

const router = express.Router();

router.post("/", verifyUser, catchAsync(createCampaign));
router.get("/", verifyUser, catchAsync(getCampaigns));
router.get("/joined-campaign", verifyUser, catchAsync(getJoinedCampaigns));
router.get(
  "/:campaignId/conversation",
  verifyUser,
  catchAsync(getConversation)
);
router.get("/:campaignId", verifyUser, catchAsync(getCampaign));
router.delete("/:campaignId", verifyUser, catchAsync(deleteCampaign));
router.put("/:campaignId/join", verifyUser, catchAsync(joinCampaign));
router.put("/:campaignId/leave", verifyUser, catchAsync(leaveCampaign));
router.put("/:campaignId/edit", verifyUser, catchAsync(updateCampaign));
router.post("/:campaignId/conversation", verifyUser, catchAsync(conversation));

export default router;
