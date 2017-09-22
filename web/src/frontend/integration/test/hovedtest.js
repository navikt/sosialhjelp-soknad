var hovedside, timeout;

module.exports = {
	before: (browser) => {
        timeout = browser.globals.test_settings.timeout;
        const browserInit = browser.init();
        hovedside = browserInit.page.hovedsidepage();
        hovedside.navigate();
    },
    after: (browser) => {
        // browser.end();
    },
    "hovedside skal ha minst ett skjemaelement": function () {
        hovedside.expect.element('@input').to.be.present.after(timeout);
    },
    "hovedside skal ha app tittel": function () {
		hovedside.expect.element('@appTitle').to.be.present.after(timeout);
    },
	"hovedside skal ikke ha fortsett knapp hvis man ikke har valgt bosted": function () {
		hovedside.expect.element('@fortsett').to.not.be.present.after(timeout);
	},
	"hovedside skal ha en fortsett knapp når man har valgt kommune": function () {
		hovedside.click('@horten');
		hovedside.expect.element('@fortsett').to.be.present.after(timeout);
		hovedside.click('@fortsett');
	},
	"første steg i skjemaet skal inneholde konto- og telefonnummer": function () {
		const soknadsskjema = hovedside.section.soknadsskjema;
		soknadsskjema.expect.element('@kontonummer').to.be.present.after(timeout);
		soknadsskjema.expect.element('@telefon').to.be.present;

		soknadsskjema.clearValue('@telefon');
		soknadsskjema.setValue('@telefon', '007');
		soknadsskjema.clearValue('@kontonummer');
		soknadsskjema.setValue('@kontonummer', '007007');
		hovedside.click('@fortsett');
		soknadsskjema.expect.element('@feiloppsummering').to.be.present.after(timeout);
	}

};