import express from "express";
import handleScreenshot from "./handlers/handleScreenshot";
const app = express();

app.get("/screenshot", handleScreenshot);

app.listen(3000);
