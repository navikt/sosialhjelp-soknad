exports.allowCrossDomain = function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "http://localhost:3000");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
	res.header("Access-Control-Allow-Headers", "Content-Type,X-XSRF-TOKEN");
	res.header("Access-Control-Allow-Credentials", "true");
	next();
};
