"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const action_1 = require("../controller/action");
const catchAsync_1 = require("../middleware/catchAsync");
const router = express_1.default.Router();
router.post("/", (0, catchAsync_1.catchAsync)(action_1.addAction));
router.get("/", (0, catchAsync_1.catchAsync)(action_1.getActions));
exports.default = router;
