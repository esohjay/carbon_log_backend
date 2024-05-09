"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const campaign_1 = require("../controller/campaign");
const catchAsync_1 = require("../middleware/catchAsync");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.createCampaign));
router.get("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.getCampaigns));
router.get("/joined-campaign", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.getJoinedCampaigns));
router.put("/:campaignId/join", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.joinCampaign));
router.put("/:campaignId/leave", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.leaveCampaign));
router.post("/:campaignId/conversation", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(campaign_1.conversation));
exports.default = router;
