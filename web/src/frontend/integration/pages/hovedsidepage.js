module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
	    input: '.skjemaelement__input',
	    appTitle: '.app-digisos__title',
	    horten: '.skjemaelement__input option[value=horten]',
		fortsett: '.knapp--hoved'
    },
    sections: {
	    soknadsskjema: {
		    selector: '.skjema-steg',
		    elements: {
			    kontonummer: 'input[id=kontakt_kontonummer]',
			    telefon: 'input[id=kontakt_telefon]',
			    har_feil: '.skjemaelement__input--harFeil',
			    input_feilmelding: '.skjemaelement__feilmelding',
			    feiloppsummering: '.panel--feiloppsummering'
		    }
	    }
    }
};