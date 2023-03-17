describe("NySoknadVelkomst component", () => {
    beforeEach(() => {
        cy.visit("http://localhost:3000/sosialhjelp/soknad/informasjon");
        cy.contains("Logg inn").click();
        cy.url().should("include", "localhost:3000/sosialhjelp/soknad/informasjon");
        cy.contains("Start en ny søknad").click();
    });

    it("renders information about personal infornation", () => {
        cy.contains("Slik behandler vi personopplysningene dine").click();
        cy.contains("Innhenting av personopplysninger");
    });

    it("Should be able to start a new application", () => {
        cy.contains("Start søknaden").click();
        cy.contains("Vi har hentet følgende opplysninger fra Min side");
    });

    it("Should delete the application", () => {
        cy.contains("Slett søknaden").click();
        cy.contains("Slett søknaden").click();
        cy.contains("Søknaden er slettet");
    });
});
