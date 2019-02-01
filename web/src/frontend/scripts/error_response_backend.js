const express = require('express');
const utils = require("./utils.js");

const app = express();
app.use(utils.allowCrossDomain);
const port = 4004;

var counter = 0;

app.get('/response409', (req, res) => {
	counter++;
	res.type('application/json');
	if (counter > 4) {
		counter = 0;
		res.send({hello: {world: true}});
		console.log("Respond 200 OK")
	} else {
		res.status(409).send({internalError: {cause: true, counter: counter}});
		console.log("Respond 409 Conflict")
	}
});

app.listen(port, () => console.log(`Server running. Go to http://localhost:${port}/response409`));
