describe('soknadBolkService', function () {
    beforeEach(module('nav.kravdialogbp.soknad'));

    beforeEach(inject(function (soknadBolkService) {
        this.soknadBolkService = soknadBolkService;
    }));

    it('getBolkMedNavn() skal returere bolken med ID som gitt navn', function () {
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').id).toBe('dummybolk1');
    });

    it('apneTab() skal sette gitt bolk til åpen', function () {
        this.soknadBolkService.getBolkMedNavn('dummybolk1').apen = false;
        this.soknadBolkService.apneTab('dummybolk1');
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').apen).toBeTruthy();
    });

    it('apneTab() skal sette flere bolker til åpen', function () {
        this.soknadBolkService.getBolkMedNavn('dummybolk1').apen = false;
        this.soknadBolkService.getBolkMedNavn('dummybolk2').apen = false;
        this.soknadBolkService.apneTab(['dummybolk1', 'dummybolk2']);
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').apen).toBeTruthy();
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk2').apen).toBeTruthy();
    });

    it('lukkTab() skal sette gitt bolk til ikke åpen', function () {
        this.soknadBolkService.getBolkMedNavn('dummybolk1').apen = true;
        this.soknadBolkService.lukkTab('dummybolk1');
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').apen).toBeFalsy();
    });

    it('lukkTab() skal sette flere bolker til ikke åpen', function () {
        this.soknadBolkService.getBolkMedNavn('dummybolk1').apen = true;
        this.soknadBolkService.getBolkMedNavn('dummybolk2').apen = true;
        this.soknadBolkService.lukkTab(['dummybolk1', 'dummybolk2']);
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').apen).toBeFalsy();
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk2').apen).toBeFalsy();
    });

    it('settValidert() skal sette bolken til validert', function () {
        this.soknadBolkService.getBolkMedNavn('dummybolk1').validering = true;
        this.soknadBolkService.settValidert('dummybolk1');
        expect(this.soknadBolkService.getBolkMedNavn('dummybolk1').validering).toBeFalsy();
    });
});