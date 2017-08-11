beforeEach(function(){
    jasmine.addMatchers({
        toContainHtmlString: function (util) {
            return {
                compare: function (actual, expected) {
                    var result = {
                        pass: util.contains(actual, expected)
                    };

                    if (result.pass) {
                        result.message = "Expected HTML-element to not contain: " + expected;
                    } else {
                        result.message = "Expected HTML-element to contain: " + expected;
                    }

                    return result;
                }
            };
        }
    });
});
