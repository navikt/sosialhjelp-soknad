describe("Soknad step 1: Personal Information", () => {
    let isFirstTest = true;

    beforeEach(() => {
        if (isFirstTest) {
            cy.startNewSoknad();
            cy.get('[data-testid="personalia-infotekst"]').should("be.visible");
        } else {
            cy.continueSoknad();
        }
        isFirstTest = false;
    });

    it("Should be able to edit the phone number field", () => {
        cy.get('[data-testid="telefon-endreknapp"]').click();
        cy.get('input[name="brukerutfyltVerdi"]').type("40506070");
        cy.get('[data-testid="lagre-telefonnummer"]').click();
    });

    it("Should be able to edit the kontonummer field", () => {
        cy.get('[data-testid="kontonummer-endreknapp"]').click();
        cy.get('input[name="brukerutfyltVerdi"]').type("0000 11 22223");
        cy.get('[data-testid="lagre-kontonummer"]').click();
    });

    it("Should be able to pick address", () => {
        cy.get('[data-testid="addresse-valg"]').click();
    });

    it("Should be able to continue to the next page", () => {
        cy.contains("Neste steg").click();
        cy.get('[data-testid="skjemasteg-2-heading"]').should("be.visible");
    });
});
