declare namespace Cypress {
    interface Chainable {
        startNewSoknad(): Chainable<void>;
        continueSoknad(): Chainable<void>;
    }
}
