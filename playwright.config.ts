import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "blob" : "html",
    timeout: 30 * 1000,

    globalSetup: "./e2e/global-setup",

    use: {
        baseURL: "http://localhost:3001",
        trace: "on-first-retry",
        storageState: "e2e/.auth/storage.json",
    },

    projects: [
        {
            name: "chromium",
            use: {...devices["Desktop Chrome"]},
        },
        {
            name: "firefox",
            use: {...devices["Desktop Firefox"]},
        },
        {
            name: "Pixel 7",
            use: {...devices["Pixel 7"]},
        },
    ],

    webServer: process.env.CI
        ? undefined
        : {
              command: "pnpm run dev",
              url: "http://localhost:3001/sosialhjelp/soknad/internal/isAlive",
              reuseExistingServer: false,
              timeout: 120 * 1000,
          },
});
