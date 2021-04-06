import express from "express";
import handleCompare from "./handlers/handleCompare";
import handleScreenshot from "./handlers/handleScreenshot";
const app = express();

app.get("/screenshot", handleScreenshot);
app.get("/compare", handleCompare);

app.listen(3000);
