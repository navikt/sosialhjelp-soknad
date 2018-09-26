// nightwatch.conf.js

const chromedriver = require('chromedriver');

module.exports = {
	output_folder: "./reports",
    test_settings: {
        default: {
            webdriver: {
                start_process: true,
                server_path: chromedriver.path,
                cli_args: ['--port=4444']
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['headless', 'disable-gpu']
                }
            }
        },
        chrome: {
            webdriver: {
                server_path: chromedriver.path
            },
            desiredCapabilities: {
                browserName: 'chrome',
                javascriptEnabled: true,
                acceptSslCerts: true,
                chromeOptions: {
                    args: ['disable-gpu']
                }
            }
        }
    }
};
