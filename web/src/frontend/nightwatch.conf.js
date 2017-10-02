const argv = require('yargs')
	.option('url',  {
		type: 'string'
	})
	.argv;

const chromedrivers = {
	'linux': './selenium/chromedriver',
	'win32': './selenium/chromedriver.exe',
	'win64': './selenium/chromedriver.exe'
};

const phantomjsdrivers = {
	'linux': './selenium/phantomjs',
	'win32': './selenium/phantomjs.exe',
	'win64': './selenium/phantomjs.exe'
};

module.exports = ((settings) => {
	settings.selenium.cli_args['webdriver.chrome.driver'] = chromedrivers[process.platform];
settings.selenium.cli_args['phantomjs.binary.path'] = phantomjsdrivers[process.platform];

settings['test_settings'].default.screenshots = false;

settings['test_settings'].default.login = false;
if(argv.url) {
	settings['test_settings'].default['launch_url'] = argv.url;
}

return settings;
})(require('./nightwatch.json'));
