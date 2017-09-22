module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
	    input: '.skjemaelement__input',
	    appTitle: '.app-digisos__title',
	    horten: '.skjemaelement__input option[value=horten]',
		fortsett: 'button.knapp--hoved'
    },
    sections: {
	    soknadsskjema: {
		    selector: '.skjema-steg',
		    elements: {
			    kontonummer: 'input[id=kontakt_kontonummer]', // '#kontakt_kontonummer', // 'input[id=kontakt\.kontonummer]', // '.kontakt___kontonummer',
			    telefon: 'input[id=kontakt_telefon]', // '#kontakt_telefon', // 'input[id=kontakt\.telefon]', // '.kontakt___telefon',
			    har_feil: '.skjemaelement__input--harFeil',
			    feiloppsummering: '.panel--feiloppsummering'
		    }
	    }
    }
};