import { Selector } from 'testcafe';

fixture `Minimal`
    .page `https://sosialhjelp-test.herokuapp.com/soknadsosialhjelp/mock-login`;

test('Grønt løp', async t => {
    await t
        .typeText('#root > span > div > div > input', "01234567890")
        .click('#login-button')
        .click('#root > span > div > div > div:nth-child(10) > button')
        .click("#start_soknad_button")
        .click('#oppholdsadresse_folkeregistrert')
        .typeText('#kontakt_telefon', '12345678')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#gaa_videre_button')
        .click('#bekreft_oppsummering_checkbox')
        .click('#gaa_videre_button')
        .expect(Selector('#root > span > div > div.blokk-center.panel.ettersendelse__panel > div:nth-child(2) > div.avsnitt > h3 > span').innerText).eql('Søknaden er sendt til');
        });