import {test, expect, Page} from "@playwright/test";
import {KvitteringDto, SessionResponse} from "../../../src/generated/model";

const DIGISOS_ID = "kvittering-test-id";
const KVITTERING = {
    digisosId: DIGISOS_ID,
    tidspunktSendt: "2026-01-15T11:00:00",
    filnavn: "Soknad.pdf",
    storrelse: 1234,
    soknadPdfUrl:
        "http://localhost:8989/sosialhjelp/mock-alt-api/fiks/dokumentlager/dokumentlager/nedlasting/niva4/dok-1",
} satisfies KvitteringDto;

const innsynUrlPattern = new RegExp(`^http://localhost:(?:3000|3002)/sosialhjelp/innsyn/nb/soknad/${DIGISOS_ID}$`);

// Låser nettleserens språk og tidssone, så testen ikke avhenger av maskinen den kjører på (CI bruker en-US og UTC)
test.use({locale: "nb-NO", timezoneId: "Europe/Oslo"});

test.beforeEach(async ({page}) => {
    await page.route("**/api/**", (route) => route.abort());
    await page.route("**/informasjon/session", (route) =>
        route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                userBlocked: false,
                daysBeforeDeletion: 14,
                open: [],
                numRecentlySent: 0,
                maxUploadSizeBytes: 10485760,
                personId: "12345678901",
            } satisfies SessionResponse),
        })
    );
    await page.route("**/feature-toggle", (route) =>
        route.fulfill({status: 200, contentType: "application/json", body: JSON.stringify({})})
    );
    await page.route(`**/api/soknad-api/kvittering/${DIGISOS_ID}`, (route) =>
        route.fulfill({status: 200, contentType: "application/json", body: JSON.stringify(KVITTERING)})
    );
});

test("should show the receipt with submission time, link to innsyn and PDF download", async ({page}) => {
    await page.goto(`/sosialhjelp/soknad/nb/kvittering/${DIGISOS_ID}`);

    await expectKvittering(page);

    expect(page.url()).not.toContain("2026");
    await page.reload();
    await expectKvittering(page);
});

async function expectKvittering(page: Page) {
    await expect(page.getByRole("main", {name: "Søknaden er sendt", exact: true})).toBeVisible();
    await expect(page.getByRole("heading", {name: "Søknaden er sendt", exact: true})).toBeVisible();
    await expect(page.getByRole("button", {name: "Gå til søknaden din på Min side", exact: true})).toHaveAttribute(
        "href",
        innsynUrlPattern
    );
    await expect(page.getByText("15. januar 2026, kl. 11:00")).toBeVisible();
    await expect(page.getByRole("button", {name: "Last ned søknaden din (pdf)", exact: true})).toHaveAttribute(
        "href",
        KVITTERING.soknadPdfUrl
    );
}

test("should not show the receipt when the backend rejects the digisos id as malformed", async ({page}) => {
    await page.route("**/api/soknad-api/kvittering/ikke-en-uuid", (route) =>
        route.fulfill({status: 400, contentType: "application/json", body: JSON.stringify({})})
    );

    await page.goto("/sosialhjelp/soknad/nb/kvittering/ikke-en-uuid");

    await expect(page).not.toHaveURL(/kvittering/);
    await expect(page.getByRole("heading", {name: "Søknaden er sendt", exact: true})).not.toBeVisible();
});
