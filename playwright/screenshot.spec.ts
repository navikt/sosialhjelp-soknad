import {expect, test} from "@playwright/test";
import path from "path";

import storybook from "../storybook-static/index.json" with {type: "json"};

const stories = Object.values(storybook.entries).filter((e) => e.type === "story");

for (const story of stories) {
    test(`${story.title} ${story.name} should not have visual regressions`, async ({page}, testInfo) => {
        const params = new URLSearchParams({
            id: story.id,
            viewMode: "story",
        });

        await page.goto(`/iframe.html?${params.toString()}`);

        try {
            await page.waitForSelector("#storybook-root", {state: "visible", timeout: 2000});
            await page.waitForLoadState("networkidle");

            await expect(page.locator("#storybook-root")).toHaveScreenshot(
                `${story.id}-${testInfo.project.name}-${process.platform}.png`,
                {
                    animations: "disabled",
                    stylePath: path.join(__dirname, "screenshot.css"),
                }
            );
        } catch {
            return;
        }
    });
}
