const fs = require('fs');

const HEROKU_APP_NAME = process.env.HEROKU_APP_NAME;
const HEROKU_MASTER_APP_NAME = "sosialhjelp-soknad";

fs.readFile('./index.html', function (err, html) {
    if (err){
        throw err;
    }

    console.warn("The name of this app is:" + HEROKU_APP_NAME);


    if (HEROKU_APP_NAME != HEROKU_MASTER_APP_NAME){
        console.warn(html.toString());
    }
});


