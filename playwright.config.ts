import {defineConfig, devices} from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? "blob" : "html",
    timeout: 30 * 1000,
    use: {
        baseURL: "http://app:8080",
        trace: "on-first-retry",
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
              reuseExistingServer: !!process.env.CI,
              timeout: 120 * 1000,
          },
});
