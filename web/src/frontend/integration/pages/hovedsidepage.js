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
			    kontonummer: '#kontakt\.kontonummer', // 'input[id=kontakt\.kontonummer]', // '.kontakt___kontonummer',
			    telefon: '#kontakt\.telefon', // 'input[id=kontakt\.telefon]', // '.kontakt___telefon',
			    har_feil: '.skjemaelement__input--harFeil',
			    videre   : '.ga_videre'
		    }
	    }
    }
};