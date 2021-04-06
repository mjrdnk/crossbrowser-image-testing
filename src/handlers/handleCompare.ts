import path from "path";
import fs from "fs";
import { Request, Response } from "express";
import { availableBrowsers } from "../constants";
import { makeDiff } from "../helpers";

export default async function (req: Request, res: Response) {
  try {
    // check if there are needed files
    const imagesDirectory = path.join(__dirname, "..", "..", "downloads");

    // prepare diff directory to save files in
    const diffPath = `${imagesDirectory}/diff`;
    if (!fs.existsSync(diffPath)) {
      fs.mkdirSync(diffPath);
    }

    const files = await Promise.all(
      availableBrowsers.map((browserType) => {
        return makeDiff(browserType, imagesDirectory);
      })
    );
    if (files) {
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  } catch (err) {
    console.error(err);
    console.error(
      "Files are probably missing. Please run snapshot endpoint first, if not done yet so."
    );
    res.sendStatus(400);
  }
}
