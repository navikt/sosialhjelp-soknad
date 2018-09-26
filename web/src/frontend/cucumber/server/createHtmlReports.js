const report = require('cucumber-html-report');
report.create({
    source:         './reports/cucumber.json',      // source json
    dest:           './reports',                    // target directory (will create if not exists)
    name:           'cucumber_report.html',         // report file name (will be index.html if not exists)
    //template:     'mytemplate.html',              // your custom mustache template (uses default if not specified)
    title:          'Cucumber Report',              // Title for default template. (default is Cucumber Report)
    component:      'Stillingsøk',                  // Subtitle for default template. (default is empty)
    logo:           './node_modules/cucumber-html-report/logos/cucumber-logo.svg',  // Path to the displayed logo.
    //screenshots:  './reports',                  // Path to the directory of screenshots. Optional.
    dateformat:     'YYYY MM DD',                   // default is YYYY-MM-DD hh:mm:ss
    maxScreenshots: 100                             // Max number of screenshots to save (default is 1000)
})
    .then(console.log)
    .catch(console.error);