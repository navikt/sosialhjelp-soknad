"use strict";

var hovedside, soknadsskjema, timeout, innloggingsside;

const loginUtils = require('../login');

/*
 * For å kjøre e2e test mot mock backend:
 *
 *    npm run e2e
 *
 * For å kjøre e2e tester mot testmiljø:
 *
 *      node nightwatch.js --env chrome --url https://testmiljo.nav.no/soknadsosialhjelp/informasjon
 *              --username xxxxx --password xxxx --login true
 *
 */
module.exports = {
	before: (browser) => {
        timeout = browser.globals.test_settings.timeout;
        const browserInit = browser.init();
        hovedside = browserInit.page.hovedsidepage();
		loginUtils.login(browser, hovedside);
		soknadsskjema = hovedside.section.soknadsskjema;
		innloggingsside = hovedside.section.innloggingsside;
        hovedside.navigate();
    },
    after: (browser) => {
        browser.end();
    },
	"førstesiden skal ha en knapp for å starte søknad": () => {
		hovedside.expect.element('@hovedknapp').to.be.present.after(timeout * 2);
		hovedside.click('@hovedknapp');
	},
	"hovedside skal ha minst ett skjemaelement": () => {
		hovedside.expect.element('@input').to.be.present.after(timeout);
	},
	"hovedside skal ha app tittel": () => {
		hovedside.expect.element('@appTitle').to.be.present.after(timeout);
	},
	"hovedside skal ikke ha fortsett knapp hvis man ikke har valgt bosted": () => {
		hovedside.expect.element('@hovedknapp').to.not.be.present.after(timeout);
	},
	"man skal få opprettet en søknad når man har valgt kommune og klikket på Fortsett knappen": () => {
		hovedside.click('@horten');
		hovedside.expect.element('@hovedknapp').to.be.present.after(timeout * 2);
		hovedside.click('@hovedknapp');
		soknadsskjema.expect.element('@kontonummer').to.be.present.after(timeout * 2);
		soknadsskjema.expect.element('@telefon').to.be.present;
	},
	"skal vise valideringsfeilmelding hvis man har fylt ut ugyldig konto- eller telefonnummer": () => {
		soknadsskjema.clearValue('@telefon');
		soknadsskjema.setValue('@telefon', '91852900');
		soknadsskjema.clearValue('@kontonummer');
		soknadsskjema.setValue('@kontonummer', '16141203123');
		hovedside.click('@hovedknapp');
		soknadsskjema.expect.element('@kontonummer').to.be.present.after(timeout);
	}
};