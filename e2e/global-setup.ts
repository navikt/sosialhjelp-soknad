import {chromium} from "@playwright/test";

/**
 * Creates the nav.no consent cookie to dismiss the cookie banner.
 * version må være lik currentConsentVersion i nav-dekoratoren (packages/client/src/webStorage.ts),
 * ellers vises banneret likevel.
 */
function createConsentCookie() {
    const now = new Date().toISOString();
    return JSON.stringify({
        consent: {
            analytics: false,
            surveys: false,
        },
        userActionTaken: true,
        meta: {
            createdAt: now,
            updatedAt: now,
            version: 5,
        },
    });
}

/**
 * Global setup that runs once before all tests
 * Sets up the nav.no consent cookie and saves it to storage state
 */
async function globalSetup() {
    const browser = await chromium.launch();
    const context = await browser.newContext();

    // Add the consent cookie to dismiss the banner
    await context.addCookies([
        {
            name: "navno-consent",
            value: createConsentCookie(),
            domain: "localhost",
            path: "/",
        },
    ]);

    // Save the storage state (including cookies) to a file
    await context.storageState({path: "e2e/.auth/storage.json"});
    await browser.close();
}

export default globalSetup;
