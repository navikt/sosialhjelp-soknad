import { client } from 'nightwatch-api';
import { Given, Then } from 'cucumber';

Given(/^I open Google`s search page$/, async () => {
    await client.url('http://google.com');
});

Then(/^the title is "(.*?)"$/, async text => {
    await client.assert.title(text);
});

Then(/^the Google search form exists$/, async () => {
    await client.assert.visible('input[name="q"]');
});
