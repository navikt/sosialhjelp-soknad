/// <reference types="cypress" />

Cypress.Commands.add("startNewSoknad", () => {
    cy.visit("http://localhost:3000/sosialhjelp/soknad/informasjon");
    cy.contains("Logg inn").click();
    cy.url().should("include", "localhost:3000/sosialhjelp/soknad/informasjon");
    cy.contains("Start en ny søknad").click();
    cy.contains("Start søknaden").click();
});
