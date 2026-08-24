import {test, expect} from "@playwright/test";
import path from "path";
import {ForventetDokumentasjonDto} from "../../src/generated/new/model";

const TEST_SOKNAD_ID = "12345678-1234-1234-1234-123456789012";

test.describe("PDF Upload and Preview", () => {
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

        await page.route(`**/${TEST_SOKNAD_ID}/dokumentasjon/forventet`, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({
                    dokumentasjon: [
                        {dokumentasjonStatus: "FORVENTET", type: "SKATTEMELDING", dokumenter: [], gruppe: "inntekt"},
                    ],
                } satisfies ForventetDokumentasjonDto),
            });
        });

        await page.route(`**/${TEST_SOKNAD_ID}/utgifter/barneutgifter`, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({}),
            });
        });

        await page.route(`**/${TEST_SOKNAD_ID}/utgifter/boutgifter`, async (route) => {
            await route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({}),
            });
        });

        await page.goto(`/sosialhjelp/soknad/nb/skjema/${TEST_SOKNAD_ID}/8`);
    });

    test("should upload and display PDF preview modal", async ({page}) => {
        const testPdfPath = path.join(__dirname, "fixtures", "test-document.pdf");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.waitFor({state: "attached"});

        await fileInput.setInputFiles(testPdfPath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const heading = modal.getByRole("heading", {level: 2});
        await expect(heading).toBeVisible();

        const pdfPage = page.locator(".react-pdf__Page");
        await expect(pdfPage).toBeVisible({timeout: 10000});

        await expect(page.getByText(/Loading PDF/)).not.toBeVisible();
    });

    test("should display PDF with fullscreen toggle", async ({page}) => {
        const testPdfPath = path.join(__dirname, "fixtures", "test-document.pdf");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(testPdfPath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const fullscreenButton = page
            .getByRole("button")
            .filter({hasText: /fullskjerm|fullscreen/i})
            .first();

        await fullscreenButton.click();

        const modalBody = modal.locator(".fixed.inset-0");
        await expect(modalBody).toBeVisible();
    });

    test("should close modal on cancel button click", async ({page}) => {
        const testPdfPath = path.join(__dirname, "fixtures", "test-document.pdf");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(testPdfPath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const cancelButton = modal.getByRole("button", {name: /avbryt|cancel/i});
        await expect(cancelButton).toBeVisible();
        await cancelButton.click();

        await expect(modal).not.toBeVisible();
    });

    test("should have upload button in modal", async ({page}) => {
        const testPdfPath = path.join(__dirname, "fixtures", "test-document.pdf");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(testPdfPath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const uploadButton = modal.getByRole("button", {name: /Last opp dokument/});
        await expect(uploadButton).toBeVisible();
    });

    test("should display image preview for non-PDF files", async ({page}) => {
        const testImagePath = path.join(__dirname, "fixtures", "test-image.jpg");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(testImagePath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const imagePreview = modal.locator("img[alt='preview']");
        await expect(imagePreview).toBeVisible({timeout: 10000});
    });

    test("should show upload button text", async ({page}) => {
        const uploadButton = page.getByRole("button", {name: /Last opp/i});
        await expect(uploadButton).toBeVisible();
    });

    test("should accept file input with supported formats", async ({page}) => {
        const fileInput = page.locator('input[type="file"]').first();

        const acceptAttribute = await fileInput.getAttribute("accept");

        expect(acceptAttribute).toContain("application/pdf");
        expect(acceptAttribute).toContain("image/jpeg");
        expect(acceptAttribute).toContain("image/png");
    });

    test("should handle multi-page PDF navigation", async ({page}) => {
        const testPdfPath = path.join(__dirname, "fixtures", "test-multi-page.pdf");

        const fileInput = page.locator('input[type="file"]').first();
        await fileInput.setInputFiles(testPdfPath);

        const modal = page.getByRole("dialog");
        await expect(modal).toBeVisible({timeout: 10000});

        const pdfPage = page.locator(".react-pdf__Page");
        await expect(pdfPage).toBeVisible({timeout: 10000});

        const nextPageButton = modal
            .getByRole("button")
            .filter({hasText: /Neste side/})
            .first();

        await expect(nextPageButton).toBeVisible();

        await nextPageButton.click();

        await expect(pdfPage).toHaveAttribute("data-page-number", "2");
    });
});
