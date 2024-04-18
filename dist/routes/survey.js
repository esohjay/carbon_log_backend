"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const survey_1 = require("../controller/survey");
const catchAsync_1 = require("../middleware/catchAsync");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(survey_1.createSurvey));
exports.default = router;
