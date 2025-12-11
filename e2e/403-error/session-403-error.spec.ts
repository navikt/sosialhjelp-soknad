import {test, expect} from "@playwright/test";

test.describe("Session Info 403 Error", () => {
    test("should display PersonbeskyttelseFeilmelding when useGetSessionInfo returns 403 with NoAccess error", async ({
        page,
    }) => {
        await page.route("**/informasjon/session", async (route) => {
            await route.fulfill({
                status: 403,
                contentType: "application/json",
                body: JSON.stringify({
                    error: "NoAccess",
                    message: "Access denied",
                }),
            });
        });

        await page.goto("/sosialhjelp/soknad");

        const alert = page.locator('[class*="navds-alert--warning"]');
        await expect(alert).toBeVisible();

        const errorMessage = page.getByText(
            /Du kan dessverre ikke bruke den digitale søknaden om økonomisk sosialhjelp/
        );
        await expect(errorMessage).toBeVisible();
    });

    test("should display generic error page on other errors (not 403)", async ({page}) => {
        await page.route("**/informasjon/session", async (route) => {
            await route.fulfill({
                status: 500,
                contentType: "application/json",
                body: JSON.stringify({
                    error: "InternalServerError",
                    message: "Server error",
                }),
            });
        });

        await page.goto("/sosialhjelp/soknad");

        await expect(page.getByRole("heading", {name: /teknisk feil/})).toBeVisible({timeout: 10000});

        const errorMessage = page.getByText(
            /Du kan dessverre ikke bruke den digitale søknaden om økonomisk sosialhjelp/
        );
        await expect(errorMessage).not.toBeVisible();
    });

    test("should display SokerUnder18Feilmelding when useGetSessionInfo returns 403 with SokerUnder18 error", async ({
        page,
    }) => {
        // Mock session endpoint - required for landing page to load
        await page.route("**/informasjon/session", async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    userBlocked: false,
                    daysBeforeDeletion: 14,
                    open: [],
                    numRecentlySent: 0,
                    maxUploadSizeBytes: 10485760,
                    personId: "12345678901",
                }),
            });
        });

        // Mock create endpoint to return 403 with SokerUnder18 error
        await page.route("**/soknad/create", async (route) => {
            await route.fulfill({
                status: 403,
                contentType: "application/json",
                body: JSON.stringify({
                    error: "SokerUnder18",
                    message: "Applicant is under 18 years old",
                }),
            });
        });

        await page.goto("/sosialhjelp/soknad/nb");

        // Click the "Start søknaden" button
        await page.getByRole("button", {name: "Nei"}).click();

        const startButton = page.getByRole("button", {name: /Start søknaden/});
        await startButton.click();

        const alert = page.locator('[class*="navds-alert--info"]');
        await expect(alert).toBeVisible();

        const heading = page.getByRole("heading", {
            name: /For å søke om økonomisk sosialhjelp må du ha fylt 18 år/,
        });
        await expect(heading).toBeVisible();

        const errorMessage = page.getByText(
            /Er du under 18 år, må du ha samtykke av dine foresatte for å søke om økonomisk sosialhjelp/
        );
        await expect(errorMessage).toBeVisible();
    });
});
