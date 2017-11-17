var express = require("express");
var router = express.Router();

router.get("/soknader/:brukerBehandlingId/vedlegg", function(
	req,
	res
) {
	console.log("Mock backend: GET vedlegg (vedleggsforventning)");
	res.json(utils.lesMockDataFil("vedlegg.json"));
});

module.exports = router;
