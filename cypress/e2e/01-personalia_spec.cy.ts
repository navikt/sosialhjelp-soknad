describe("01-personalia", () => {
    let isFirstTest = true;

    beforeEach(() => {
        if (isFirstTest) {
            cy.startNewSoknad();
            cy.contains("Vi har hentet følgende opplysninger fra Min side");
        } else {
            cy.continueSoknad();
        }
        isFirstTest = false;
    });

    it("Should be able to edit the address field", () => {
        cy.get('input[value="soknad"]').click();
        cy.get('[data-testid="adresse-sok-input"]').type("Svarutgata 1 A, 9999 SVARUT");
        cy.get('li[role="option"]').first().click();
        cy.get('[data-testid="alert-success"]').should("be.visible");
    });

    it("Should be able to edit the phone number field", () => {
        cy.get('[data-testid="telefon-endreknapp"]').click();
        cy.get('input[name="brukerutfyltVerdi"]').type("40506070");
        cy.contains("Lagre endring").click();
    });

    it("Should be able to edit the kontonummer field", () => {
        cy.get('[data-testid="kontonummer-endreknapp"]').click();
        cy.get('input[name="brukerutfyltVerdi"]').type("0000 11 22223");
        cy.contains("Lagre endring").click();
    });
});
