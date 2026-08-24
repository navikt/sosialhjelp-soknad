import {test, expect} from "@playwright/test";
import {
    AdresserDto,
    KontoinformasjonDto,
    KontoinformasjonInput,
    PersonaliaDto,
    TelefonnummerDto,
} from "../../../src/generated/new/model";

const TEST_SOKNAD_ID = "d33f8757-3182-4fa3-b273-5d26c5974fd7";

test.beforeEach(async ({page}) => {
    await page.route("**/informasjon/session", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                userBlocked: false,
                daysBeforeDeletion: 14,
                open: [TEST_SOKNAD_ID],
                numRecentlySent: 0,
                maxUploadSizeBytes: 10485760,
                personId: "12345678901",
            }),
        });
    });

    await page.route("**/feature-toggle", async (route) => {
        await route.fulfill({status: 200, contentType: "application/json", body: JSON.stringify({})});
    });

    await page.route(`**/${TEST_SOKNAD_ID}/isKort`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify(false),
        });
    });

    await page.route(`**/${TEST_SOKNAD_ID}/adresser`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({} satisfies AdresserDto),
        });
    });

    await page.route(`**/${TEST_SOKNAD_ID}/personalia/kontonummer`, async (route) => {
        const kontonummerRegister = "12312312312";
        if (route.request().method() === "GET") {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({kontonummerRegister} satisfies KontoinformasjonDto),
            });
        } else if (route.request().method() === "PUT") {
            const postData: KontoinformasjonInput = route.request().postDataJSON();
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    kontonummerRegister: kontonummerRegister,
                    kontonummerBruker: postData.kontonummerBruker,
                    harIkkeKonto: postData.harIkkeKonto,
                } satisfies KontoinformasjonDto),
            });
        }
    });
    await page.route(`**/${TEST_SOKNAD_ID}/personalia/telefonnummer`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({} satisfies TelefonnummerDto),
        });
    });

    await page.route(`**/${TEST_SOKNAD_ID}/personalia/basisPersonalia`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({
                navn: {fulltNavn: "Mann Mannesen", etternavn: "Mannesen", fornavn: "Mann"},
            } satisfies PersonaliaDto),
        });
    });
});

test("Should be able to override kontonummer with 'har ikke bankkonto'", async ({page}) => {
    await page.goto(`/sosialhjelp/soknad/skjema/${TEST_SOKNAD_ID}/1`);

    const mutation = page.waitForRequest((req) => {
        return /\/personalia\/kontonummer/.test(req.url()) && req.method() === "PUT";
    });

    const kontonummerRegion = page.getByRole("region", {name: "Ditt kontonummer"});
    await kontonummerRegion.getByRole("button", {name: "Rediger"}).click();
    await kontonummerRegion.getByRole("checkbox").click();
    await kontonummerRegion.getByRole("button", {name: "Lagre"}).click();

    const postDataJSON: KontoinformasjonDto = (await mutation).postDataJSON();
    expect(postDataJSON.harIkkeKonto).toEqual(true);
    expect(postDataJSON.kontonummerBruker).toBeUndefined();

    await expect(kontonummerRegion.getByText("Jeg har ikke en bankkonto jeg kan bruke.")).toBeVisible();
});

test("Should be able to override kontonummer with custom kontonummer", async ({page}) => {
    await page.goto(`/sosialhjelp/soknad/skjema/${TEST_SOKNAD_ID}/1`);

    const mutation = page.waitForRequest((req) => {
        return /\/personalia\/kontonummer/.test(req.url()) && req.method() === "PUT";
    });

    const kontonummerRegion = page.getByRole("region", {name: "Ditt kontonummer"});
    await kontonummerRegion.getByRole("button", {name: "Rediger"}).click();
    await kontonummerRegion.getByRole("textbox").fill("99999999999");
    await kontonummerRegion.getByRole("button", {name: "Lagre"}).click();

    const postDataJSON: KontoinformasjonDto = (await mutation).postDataJSON();
    expect(postDataJSON.harIkkeKonto).toBe(false);
    expect(postDataJSON.kontonummerBruker).toEqual("99999999999");

    await expect(kontonummerRegion.getByText("9999 99 99999")).toBeVisible();
});

test("Should show error when custom kontonummer is invalid", async ({page}) => {
    await page.goto(`/sosialhjelp/soknad/skjema/${TEST_SOKNAD_ID}/1`);

    let kontonummerPutWasMade = false;

    page.on("request", (req) => {
        if (/\/personalia\/kontonummer/.test(req.url()) && req.method() === "PUT") {
            kontonummerPutWasMade = true;
        }
    });

    const kontonummerRegion = page.getByRole("region", {name: "Ditt kontonummer"});
    await kontonummerRegion.getByRole("button", {name: "Rediger"}).click();
    await kontonummerRegion.getByRole("textbox").fill("99999993");
    await kontonummerRegion.getByRole("button", {name: "Lagre"}).click();

    await page.waitForLoadState("networkidle");
    expect(kontonummerPutWasMade).toBe(false);

    await expect(kontonummerRegion.getByText("Kontonummer må fylles ut")).toBeVisible();
    await expect(kontonummerRegion.getByRole("button", {name: "Lagre"})).toBeVisible();
});
