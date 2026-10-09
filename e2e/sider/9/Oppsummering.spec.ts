import {test, expect} from "@playwright/test";
import {
    AntallInnsendteSoknaderDto,
    Oppsummering,
    SoknadApiError,
    SoknadApiErrorError,
    SoknadApiErrorResponseType,
} from "../../../src/generated/model";
import {AdresserDto, InnsendingFeiletError, InnsendingFeiletErrorType} from "../../../src/generated/new/model";

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
        await route.fulfill({status: 200, contentType: "application/json", body: JSON.stringify(false)});
    });

    await page.route(`**/${TEST_SOKNAD_ID}/oppsummering`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({steg: []} satisfies Oppsummering),
        });
    });

    await page.route(`**/${TEST_SOKNAD_ID}/adresser`, async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({} satisfies AdresserDto),
        });
    });

    await page.route("**/minesaker/antallSisteDogn", async (route) => {
        await route.fulfill({
            status: 200,
            contentType: "application/json",
            body: JSON.stringify({antall: 0, maxAntall: 3} satisfies AntallInnsendteSoknaderDto),
        });
    });
});

test("should display the specific error message when submission fails with BrokenSoknad", async ({page}) => {
    await page.route(`**/soknad/${TEST_SOKNAD_ID}/send`, async (route) => {
        expect(route.request().method()).toBe("POST");
        await route.fulfill({
            status: 400,
            contentType: "application/json",
            body: JSON.stringify({
                error: SoknadApiErrorError.BrokenSoknad,
                responseType: SoknadApiErrorResponseType.SoknadApiError,
            } satisfies SoknadApiError),
        });
    });

    await page.goto(`/sosialhjelp/soknad/nb/skjema/${TEST_SOKNAD_ID}/9`, {waitUntil: "domcontentloaded"});
    await page.getByRole("button", {name: "Send søknaden", exact: true}).click();

    const oppsummering = page.getByRole("main", {name: "Oppsummering"});
    await expect(oppsummering.getByRole("heading", {name: "Beklager, noe gikk galt"})).toBeVisible();
    await expect(
        oppsummering.getByText(
            "Det oppstod en teknisk feil, og søknaden ble ikke sendt inn. Vi anbefaler at du sletter søknaden og sender inn en ny. Vi beklager ulempene dette medfører."
        )
    ).toBeVisible();
    await expect(oppsummering).toContainText(
        "Har du ikke penger til mat, bolig eller strøm det neste døgnet, ber vi deg ta kontakt med ditt Nav-kontor eller ring oss på 55 55 33 33."
    );
    await expect(oppsummering.getByRole("link", {name: "ditt Nav-kontor"})).toHaveAttribute(
        "href",
        "https://www.nav.no/sok-nav-kontor"
    );
    await expect(page.getByRole("heading", {name: "Feil ved innsendelse"})).not.toBeVisible();
    await expect(oppsummering).not.toContainText("prøve igjen senere");
});

test("should display a separate message when submission fails with MottakPabegynt", async ({page}) => {
    await page.route(`**/soknad/${TEST_SOKNAD_ID}/send`, async (route) => {
        expect(route.request().method()).toBe("POST");
        await route.fulfill({
            status: 400,
            contentType: "application/json",
            body: JSON.stringify({
                error: SoknadApiErrorError.MottakPabegynt,
                responseType: SoknadApiErrorResponseType.SoknadApiError,
            } satisfies SoknadApiError),
        });
    });

    await page.goto(`/sosialhjelp/soknad/nb/skjema/${TEST_SOKNAD_ID}/9`, {waitUntil: "domcontentloaded"});
    await page.getByRole("button", {name: "Send søknaden", exact: true}).click();

    const oppsummering = page.getByRole("main", {name: "Oppsummering"});
    await expect(oppsummering.getByRole("heading", {name: "Innsending av søknaden er gjort"})).toBeVisible();
    await expect(
        oppsummering.getByText(
            "Sjekk innsynet ditt på Min side innen 15 minutter for å se om søknaden er mottatt. Hvis søknaden ikke vises etter 15 minutter, kan du prøve å sende den på nytt eller kontakte Nav-kontoret ditt."
        )
    ).toBeVisible();
    await expect(oppsummering.getByRole("heading", {name: "Er du i en nødssituasjon?"})).toBeVisible();
    await expect(oppsummering).toContainText(
        "Har du ikke penger til mat, bolig eller strøm det neste døgnet, ber vi deg ta kontakt med ditt Nav-kontor eller ring oss på 55 55 33 33."
    );
    await expect(oppsummering.getByRole("link", {name: "ditt Nav-kontor"})).toHaveAttribute(
        "href",
        "https://www.nav.no/sok-nav-kontor"
    );
    await expect(oppsummering.getByRole("heading", {name: "Beklager, noe gikk galt"})).not.toBeVisible();
    await expect(oppsummering.getByRole("heading", {name: "Feil ved innsendelse"})).not.toBeVisible();
});

test("should display the general error message when submission fails with InnsendingFeilet", async ({page}) => {
    const deletionDate = "20.10.2026";

    await page.route(`**/soknad/${TEST_SOKNAD_ID}/send`, async (route) => {
        expect(route.request().method()).toBe("POST");
        await route.fulfill({
            status: 500,
            contentType: "application/json",
            body: JSON.stringify({
                type: InnsendingFeiletErrorType.InnsendingFeilet,
                deletionDate,
            } satisfies InnsendingFeiletError),
        });
    });

    await page.goto(`/sosialhjelp/soknad/nb/skjema/${TEST_SOKNAD_ID}/9`, {waitUntil: "domcontentloaded"});
    await page.getByRole("button", {name: "Send søknaden", exact: true}).click();

    const oppsummering = page.getByRole("main", {name: "Oppsummering"});
    await expect(oppsummering.getByRole("heading", {name: "Feil ved innsendelse"})).toBeVisible();
    await expect(
        oppsummering.getByText("Beklager, vi kan ikke sende søknaden din akkurat nå på grunn av en teknisk feil.")
    ).toBeVisible();
    await expect(
        oppsummering.getByText(
            `Søknaden din ligger på Min side frem til ${deletionDate}, så du kan prøve igjen senere.`
        )
    ).toBeVisible();
    await expect(oppsummering.getByRole("heading", {name: "Er du i en nødssituasjon?"})).toBeVisible();
    await expect(oppsummering).toContainText("Kontakt ditt Nav-kontor eller ring oss på 55 55 33 33.");
    await expect(oppsummering.getByRole("link", {name: "ditt Nav-kontor"})).toHaveAttribute(
        "href",
        "https://www.nav.no/sok-nav-kontor"
    );
    await expect(oppsummering.getByRole("heading", {name: "Beklager, noe gikk galt"})).not.toBeVisible();
    await expect(oppsummering).not.toContainText("Vi anbefaler at du sletter søknaden og sender inn en ny.");
});
