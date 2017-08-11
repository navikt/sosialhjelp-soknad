describe('soknadBolkService', function () {
    beforeEach(module('nav.soknadsosialhjelp.soknad'));

    beforeEach(inject(function (soknadBolkService) {
        this.soknadBolkService = soknadBolkService;
    }));

    it('getBolkMedNavn() skal returere bolken med ID som gitt navn', function () {
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').id).toBe('arbeidbolk');
    });

    it('apneTab() skal sette gitt bolk til åpen', function () {
        this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen = false;
        this.soknadBolkService.apneTab('arbeidbolk');
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen).toBeTruthy();
    });

    it('apneTab() skal sette flere bolker til åpen', function () {
        this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen = false;
        this.soknadBolkService.getBolkMedNavn('familiebolk').apen = false;
        this.soknadBolkService.apneTab(['arbeidbolk', 'familiebolk']);
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen).toBeTruthy();
        expect(this.soknadBolkService.getBolkMedNavn('familiebolk').apen).toBeTruthy();
    });

    it('lukkTab() skal sette gitt bolk til ikke åpen', function () {
        this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen = true;
        this.soknadBolkService.lukkTab('arbeidbolk');
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen).toBeFalsy();
    });

    it('lukkTab() skal sette flere bolker til ikke åpen', function () {
        this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen = true;
        this.soknadBolkService.getBolkMedNavn('familiebolk').apen = true;
        this.soknadBolkService.lukkTab(['arbeidbolk', 'familiebolk']);
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').apen).toBeFalsy();
        expect(this.soknadBolkService.getBolkMedNavn('familiebolk').apen).toBeFalsy();
    });

    it('settValidert() skal sette bolken til validert', function () {
        this.soknadBolkService.getBolkMedNavn('arbeidbolk').validering = true;
        this.soknadBolkService.settValidert('arbeidbolk');
        expect(this.soknadBolkService.getBolkMedNavn('arbeidbolk').validering).toBeFalsy();
    });
});