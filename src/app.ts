import express, { Request, Response, NextFunction } from "express";
import serverless from "serverless-http";
import { ExpressError } from "./middleware/ExpressError";
import userRoute from "./routes/user";
import surveyRoute from "./routes/survey";
import trackRoute from "./routes/track";
import actionRoute from "./routes/action";
import campaignRoute from "./routes/campaign";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.get("/", (_, res) => {
  res.json({
    msg: "This is carbon log api",
  });
});
app.use("/api/v1/user", userRoute);
app.use("/api/v1/survey", surveyRoute);
app.use("/api/v1/track", trackRoute);
app.use("/api/v1/action", actionRoute);
app.use("/api/v1/campaign", campaignRoute);

app.all("*", (req, res, next) => {
  next(new ExpressError("Page Not Found", 404));
});
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Oh No, Something Went Wrong!";
  res.status(statusCode).send(err.message);
});

export const handler = serverless(app);
