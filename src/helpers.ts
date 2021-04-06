import playwright from "playwright";
import { availableBrowsers } from "./constants";
import { Browsers } from "./enum";

export async function takeScreenshots(
  // url of the page to screenshot
  parsedUrl: string,
  // puts new images in the /new/ directory
  isNew: boolean = false
) {
  const promises = availableBrowsers.map(async (browserType) => {
    try {
      const browser = await playwright[browserType].launch();
      const context = await browser.newContext();
      const page = await context.newPage();
      await page.goto(parsedUrl as string);
      const shot = await page.screenshot({
        path: `downloads/${isNew ? "new/" : ""}${browserType}.png`,
      });
      await browser.close();
      return shot;
    } catch (error) {
      throw error;
    }
  });

  return Promise.all(promises);
}
