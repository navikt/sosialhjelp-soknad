module.exports = {
    url: function () {
        return this.api.launchUrl;
    },
    elements: {
	    input: '.skjemaelement__input',
	    appTitle: '.app-digisos__title',
	    horten: '.skjemaelement__input option[value=horten]',
		hovedknapp: '.knapp--hoved'
    },
    sections: {
	    innloggingsside: {
	    	selector: '.box',
		    elements: {
	    		brukernavn: '.textbox:nth-of-type(1)',
			    passord: '.textbox:nth-of-type(2)',
			    loginKnapp: 'input[name=Login.Submit]'
		    }
	    },
	    soknadsskjema: {
		    selector: '.skjema-steg',
		    elements: {
			    kontonummer: 'input[id=kontakt_kontonummer]',
			    telefon: 'input[id=kontakt_telefon]',
			    statsborger: 'input[name=kontakt_statsborger]',
			    har_feil: '.skjemaelement__input--harFeil',
			    input_feilmelding: '.skjemaelement__feilmelding',
			    feiloppsummering: '.panel--feiloppsummering'
		    }
	    }
    }
};