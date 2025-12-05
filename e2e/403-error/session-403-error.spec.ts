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

        // Navigate to the application
        await page.goto("/sosialhjelp/soknad");

        // Wait for the error page to render
        // The PersonbeskyttelseFeilmelding component should be visible
        // await expect(page.getByRole("heading", {level: 2})).toBeVisible({timeout: 10000});
        // Verify that the warning alert is displayed (PersonbeskyttelseFeilmelding uses Alert with variant="warning")
        const alert = page.locator('[class*="navds-alert--warning"]');
        await expect(alert).toBeVisible();

        // Verify the link to NAV contact info is present
        const navLink = page.getByText(/Du kan dessverre ikke bruke den digitale søknaden om økonomisk sosialhjelp/);
        await expect(navLink).toBeVisible();
    });

    test("should display generic error page when useGetSessionInfo returns 403 without NoAccess error", async ({
        page,
    }) => {
        await page.route("**/informasjon/session", async (route) => {
            await route.fulfill({
                status: 403,
                contentType: "application/json",
                body: JSON.stringify({
                    error: "OtherError",
                    message: "Forbidden",
                }),
            });
        });

        // Navigate to the application
        await page.goto("/sosialhjelp/soknad");

        // Wait for the error page to render
        // Should show the generic error page (TekniskFeil), not PersonbeskyttelseFeilmelding
        await expect(page.getByRole("heading")).toBeVisible({timeout: 10000});

        // Verify that it's NOT the PersonbeskyttelseFeilmelding by checking for absence of the specific link
        const navLink = page.getByRole("link", {name: /ditt nav/i});
        // This link is specific to PersonbeskyttelseFeilmelding, so it should not be present
        await expect(navLink).not.toBeVisible();
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

        // Navigate to the application
        await page.goto("/sosialhjelp/soknad");

        // Wait for the error page to render
        await expect(page.getByRole("heading", {name: /teknisk feil/})).toBeVisible({timeout: 10000});

        // Verify that it's NOT the PersonbeskyttelseFeilmelding
        const navLink = page.getByRole("link", {name: /ditt nav/i});
        await expect(navLink).not.toBeVisible();
    });
});
