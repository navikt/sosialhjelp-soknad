import { client } from 'nightwatch-api';
import { Then, When } from 'cucumber';

When('jeg går til startsiden for digisos søknaden', async () => {
	await client
		.url("http://localhost:3000/soknadsosialhjelp/informasjon")
});


Then('skal  jeg se en hovedtittel som sier {string}', async (expectedHeaderText) => {

	let actualHeaderText = "";

	await client
		.waitForElementVisible('.banner__tittel', 10000)
		.getText('.banner__tittel', async (result) => {
			actualHeaderText = result.value
		});

	await client.pause(1000);

	await client.assert.equal(actualHeaderText, expectedHeaderText)
});

When('jeg klikker gjennom hele søknaden så funker alt', async () => {


	await client.url("http://localhost:3000/soknadsosialhjelp/informasjon");

	await client.pause(4000);

	await client
		.waitForElementVisible('#start_soknad_button', 10000)
		.click('#start_soknad_button')
		.pause(1000)
		.waitForElementVisible('#kommune_dropdown', 10000)
		.click('#kommune_dropdown option[value=horten]')
		.pause(1000)
		.click('#gaa_videre_knapp')
		.pause(1000);

	// for(var n = 1; n < 9; n++){
	// 	gaaVidere(client);
	// }

	await client.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000)
		.waitForElementVisible('#gaa_videre_button', 10000)
		.click('#gaa_videre_button')
		.pause(1000);

	await client.waitForElementVisible('label[for=bekreft_oppsummering_checkbox]')
		.click('label[for=bekreft_oppsummering_checkbox]')
		.pause(1000)
		.click('#gaa_videre_button')
		.pause(1000);

	await client
		.waitForElementVisible('div[class=ettersendelse]', 10000)
		.assert.urlContains("ettersendelse")
		.end();

});

// async function gaaVidere(client){
// 	await client.waitForElementVisible('#gaa_videre_button', 10000)
// 		.click('#gaa_videre_button')
// 		.pause(1000)
// }

