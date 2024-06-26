"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const express_1 = __importDefault(require("express"));
const serverless_http_1 = __importDefault(require("serverless-http"));
const ExpressError_1 = require("./middleware/ExpressError");
const user_1 = __importDefault(require("./routes/user"));
const survey_1 = __importDefault(require("./routes/survey"));
const track_1 = __importDefault(require("./routes/track"));
const action_1 = __importDefault(require("./routes/action"));
const campaign_1 = __importDefault(require("./routes/campaign"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use(express_1.default.urlencoded({ extended: false }));
app.get("/", (_, res) => {
    res.json({
        msg: "This is carbon log api",
    });
});
app.use("/api/v1/user", user_1.default);
app.use("/api/v1/survey", survey_1.default);
app.use("/api/v1/track", track_1.default);
app.use("/api/v1/action", action_1.default);
app.use("/api/v1/campaign", campaign_1.default);
app.all("*", (req, res, next) => {
    next(new ExpressError_1.ExpressError("Page Not Found", 404));
});
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message)
        err.message = "Oh No, Something Went Wrong!";
    res.status(statusCode).send(err.message);
});
exports.handler = (0, serverless_http_1.default)(app);
