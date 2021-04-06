import { Request, Response } from "express";
import { takeScreenshots } from "../helpers";

export default async function (req: Request, res: Response) {
  const { url, retake } = req.query;
  if (url == null) {
    res.sendStatus(400);
  }

  // if it's array, get the first element, otherwise take the string
  const parsedUrl = Array.isArray(url) ? url[0] : url;
  const shots = await takeScreenshots(parsedUrl as string, Boolean(retake));
  if (shots) {
    res.sendStatus(200);
  } else {
    res.sendStatus(500);
  }
}
