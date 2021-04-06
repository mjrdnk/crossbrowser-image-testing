import playwright from "playwright";
import fs from "fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
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
        path: `downloads/${isNew ? "new/" : "original/"}${browserType}.png`,
      });
      await browser.close();
      return shot;
    } catch (error) {
      throw error;
    }
  });

  return Promise.all(promises);
}

export function makeDiff(browserType: Browsers, imagesDirectory: string) {
  return new Promise((resolve, reject) => {
    try {
      // existing and new screenshot needed to compare
      const newImage = PNG.sync.read(
        fs.readFileSync(`${imagesDirectory}/new/${browserType}.png`)
      );
      const originalImage = PNG.sync.read(
        fs.readFileSync(`${imagesDirectory}/original/${browserType}.png`)
      );
      const { width, height } = newImage;
      const diff = new PNG({ width, height });

      // create diff in memory
      pixelmatch(newImage.data, originalImage.data, diff.data, width, height, {
        threshold: 0.1,
      });

      // save diff
      const file = fs.writeFileSync(
        `${imagesDirectory}/diff/${browserType}.png`,
        PNG.sync.write(diff)
      );
      resolve(file);
    } catch (error) {
      reject(error);
    }
  });
}
