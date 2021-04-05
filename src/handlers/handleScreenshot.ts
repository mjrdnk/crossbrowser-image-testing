import { Request, Response } from "express";
import playwright from "playwright";
import { Browsers } from "../enum";

export default async function (req: Request, res: Response) {
  const { url } = req.query;
  if (url == null) {
    res.send(400);
  }

  // if it's array, get the first element, otherwise take the string
  const parsedUrl = Array.isArray(url) ? url[0] : url;

  if (parsedUrl) {
    for (const browserType of [
      Browsers.CHROMIUM,
      Browsers.FIREFOX,
      Browsers.WEBKIT,
    ]) {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(parsedUrl as string);
      await page.screenshot({ path: `downloads/${browserType}.png` });
      await browser.close();
    }
  }
}
