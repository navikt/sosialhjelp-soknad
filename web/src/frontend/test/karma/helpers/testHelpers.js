angular.module('nav.test.helpers', [])
    .service('TestHelpers', function(){
        return {
            harElementMedInnhold: function(element, innhold) {
                var elementerMedInnhold = element.filter(function(index, el){
                    return $(el).text() === innhold;
                });
                return elementerMedInnhold.length > 0;
            }
        };
    });