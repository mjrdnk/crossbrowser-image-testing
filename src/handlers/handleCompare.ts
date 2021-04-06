import fs from "fs";
import path from "path";
import { Request, Response } from "express";
import { availableBrowsers, textEncoding } from "../constants";

export default function (req: Request, res: Response) {
  try {
    // check if there are needed files
    const imagesDirectory = path.join(__dirname, "..", "..", "downloads");
    availableBrowsers.forEach((browserType) => {
      // existing and new screenshot needed to compare
      fs.readFileSync(
        `${imagesDirectory}/new/${browserType}.png`,
        textEncoding
      );
      fs.readFileSync(`${imagesDirectory}/${browserType}.png`, textEncoding);
    });
  } catch (err) {
    console.error("Files are missing. Please run snapshot endpoint first");
    res.sendStatus(400);
  }
}
