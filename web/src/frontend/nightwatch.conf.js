const argv = require('yargs')
	.option('url',  {
		type: 'string'
	})
	.option('t',  {
		alias: 'timeout',
		type: 'number'
	})
	.option('l',  {
		alias: 'login',
		type: 'string'
	})
	.option('u',  {
		alias: 'username',
		type: 'string'
	})
	.option('p',  {
		alias: 'password',
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
	if(argv.login) {
		settings[ 'test_settings' ].default.login = true;
	} else {
		settings['test_settings'].default.login = false;
	}
	if(argv.url) {
		settings['test_settings'].default['launch_url'] = argv.url;
	}
	if(argv.timeout) {
		settings['test_settings'].default['timeout'] = argv.timeout;
	}
	if (argv.username) {
		settings['test_settings'].default.username = argv.username;
		settings['test_settings'].default.password = argv.password;
	}
	return settings;
})(require('./nightwatch.json'));
