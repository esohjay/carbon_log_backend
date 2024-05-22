"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controller/user");
const catchAsync_1 = require("../middleware/catchAsync");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
router.post("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(user_1.createUser));
router.put("/edit", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(user_1.updateUser));
router.put("/edit-password", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(user_1.updatePassword));
router.get("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(user_1.getUser));
router.delete("/", auth_1.verifyUser, (0, catchAsync_1.catchAsync)(user_1.deleteUser));
exports.default = router;
