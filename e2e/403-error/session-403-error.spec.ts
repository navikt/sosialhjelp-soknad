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

        await page.goto("/sosialhjelp/soknad");

        await expect(page.getByRole("heading", {name: /teknisk feil/})).toBeVisible({timeout: 10000});

        const errorMessage = page.getByText(
            /Du kan dessverre ikke bruke den digitale søknaden om økonomisk sosialhjelp/
        );
        await expect(errorMessage).not.toBeVisible();
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
});
