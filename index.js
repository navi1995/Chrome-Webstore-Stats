const express = require('express');
const rp = require('request-promise-native');
const URL_HOMEPAGE_PREFIX = 'https://chrome.google.com/webstore/detail/';
const REGEX_NAME = '<meta itemprop="name" content="([^"]*)"/>';
const REGEX_INSTALL_COUNT = '<Attribute name="user_count">([0-9]*)</Attribute>';
const REGEX_RATING_COUNT = '<meta itemprop="ratingCount" content="([0-9]*)"/>';
const REGEX_RATING_VALUE = '<meta itemprop="ratingValue" content="([0-9.]*)"/>';
const REGEX_EXTENSIONID = /[a-z]{32}$/;

var app = express();

async function getStats(extensionID) {
	if (!REGEX_EXTENSIONID.test(extensionID.toLowerCase())) {
		return new Promise(function(resolve, reject) {
			resolve({
				success: false,
				error: "Invalid extension ID",
				installCount: 0,
				ratingCount: 0,
				ratingValue: 0
			});
		});
	}
	const url = `${URL_HOMEPAGE_PREFIX}${extensionID}`;
    const options = {
        method: 'GET',
        uri: url,
	};
	
	try {
		const data = await rp(options);
		const name = data.match(REGEX_NAME)[1] || 'No name';
		const installCount = parseInt(data.match(REGEX_INSTALL_COUNT)[1]) || 0;
		const ratingCount = parseInt(data.match(REGEX_RATING_COUNT)[1]) || 0;
		const ratingValue = parseFloat(data.match(REGEX_RATING_VALUE)[1]) || 0;
		return {
			success: true,
			installCount,
			ratingCount,
			ratingValue
		};
	}
	catch (e) {
		return {
			success: false,
			error: "Couldn't find extension with ID " + extensionID,
			installCount: 0,
			ratingCount: 0,
			ratingValue: 0
		};
	}
}


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.type('json');
	next();
  });

app.get('/webstore-stats', function(req, res) {
	let extensionID = req.query.id;

	// res.type('json')

	getStats(extensionID).then(function(data) {
		if (data.error) {
			return res.status(400).json({success: false, error: data.error });
		}

		console.log(data);
		return res.json(data);
	});
});

app.listen(8080, function() {
 console.log("Server is running at 3000 port!");
});