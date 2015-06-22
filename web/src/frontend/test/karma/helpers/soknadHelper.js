angular.module('nav.soknad.test.helper', ['nav.services.faktum'])
    .factory('SoknadTestGenerator', function (Faktum) {
        var faktumIdTeller = 0;

        // Konverterer en liste av objekter til riktige Faktumobjekter
        function konverterFaktaTilRiktigeFaktumobjekter(fakta) {
            for (var i = 0; i < fakta.length; i++) {
                if (!(fakta[i] instanceof Faktum)) {
                    faktum = new Faktum(fakta[i]);
                    faktum.faktumId = faktumIdTeller++;
                    fakta[i] = faktum;
                }
            }
        }

        var genererSoknad = function (arg) {
            var fakta = arg.fakta || [];

            konverterFaktaTilRiktigeFaktumobjekter(fakta);
            return {
                soknadId: 1,
                brukerBehandlingId: '1A',
                fakta: fakta,
                finnFaktum: function (key) {
                    var res = null;
                    fakta.forEach(function (item) {
                        if (item.key == key) {
                            res = item;
                        }
                    });
                    return res;
                },
                finnFakta: function (key) {
                    var res = [];
                    fakta.forEach(function (item) {
                        if (item.key === key) {
                            res.push(item);
                        }
                    });
                    return res;
                },
                finnBarnFakta: function(parentId) {
                    return this.fakta.filter(function(item) {
                        return item.parrentFaktum === parentId;
                    });
                },
                leggTilFaktum: function (faktum) {
                    if(!faktum.faktumId) {
                        faktum.faktumId = faktumIdTeller++;
                    }
                    fakta.push(new Faktum(faktum));
                },
                slettFaktum: function (faktum, successHandler) {
                    Faktum.delete({faktumId: faktum.faktumId}).$promise.then(successHandler);

                    var that = this;
                    this.fakta.forEach(function (item, index) {
                        if (item.faktumId === faktum.faktumId) {
                            that.fakta.splice(index, 1);
                        }
                    });
                },
                finnFaktumMedId: function (faktumId) {
                    var res = null;
                    fakta.forEach(function (item) {
                        if (item.faktumId === faktumId) {
                            res = item;
                        }
                    });
                    return res;
                }
        }
    };

    var genererSoknadMedTommeFaktum = function (arg) {
        arg.fakta = [];
        return genererSoknad(arg);
    };

    return {
        genererSoknad: genererSoknad,
        genererSoknadMedTommeFaktum: genererSoknadMedTommeFaktum
    };
});