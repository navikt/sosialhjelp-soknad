var fillOutloginForm = (browser, page) => {
	browser.useCss().isVisible('#IDToken1', (result) => {
		if(result.status >= 0) {
			page.expect.element('.logo').to.be.present.after(browser.globals.test_settings.timeout);
			page.api.setValue('#IDToken1', browser.globals.test_settings.username);
			page.api.setValue('#IDToken2', browser.globals.test_settings.password);
			page.api.click("input[type=submit]").pause(500);
		}
	})
}

module.exports = {
	login: (browser, page) => {
		page.navigate(browser.globals.test_settings.launch_url);
		if(browser.globals.test_settings.login) {
			browser.isVisible('.logo', (result) => {
				fillOutloginForm(browser, page);
				fillOutloginForm(browser, page);
			})
		}
	}
};
