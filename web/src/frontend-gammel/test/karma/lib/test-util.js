 //Siden IE nekter aa samarbeide paa inputfelter
    function isIE() {
        return !!(!window.addEventListner && window.ActiveXObject);
    }