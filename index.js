const fetch = require('node-fetch');
//Credit to https://github.com/petasittek/chrome-web-store-stats/ for regex below
const URL_PREFIX = 'https://chrome.google.com/webstore/detail/';
const REGEX_NAME = '<meta itemprop="name" content="([^"]*)"/>';
const REGEX_INSTALL_COUNT = '<Attribute name="user_count">([0-9]*)</Attribute>';
const REGEX_RATING_COUNT = '<meta itemprop="ratingCount" content="([0-9]*)"/>';
const REGEX_RATING_VALUE = '<meta itemprop="ratingValue" content="([0-9.]*)"/>';
//Credit to https://github.com/petasittek/chrome-web-store-stats/ for regex above
const REGEX_EXTENSIONID = /[a-z]{32}$/;

module.exports = async function(extensionID) {
	if (!REGEX_EXTENSIONID.test(extensionID.toLowerCase())) {
		return createResponse(false, 'Invalid extension ID');
	}
	
	try {
		const response = await fetch(`${URL_PREFIX}${extensionID}`); 
		const data = await response.text();
		const name = data.match(REGEX_NAME)[1] || 'No name'; //For future if multiple ID's?
		const installCount = parseInt(data.match(REGEX_INSTALL_COUNT)[1]) || 0;
		const ratingCount = parseInt(data.match(REGEX_RATING_COUNT)[1]) || 0;
		const ratingValue = parseFloat(data.match(REGEX_RATING_VALUE)[1]) || 0;

		return createResponse(true, false, installCount, ratingCount, ratingValue);
	} catch (e) {
		return createResponse(false, `Couldn't find extension with ID ${extensionID}`);
	}
}

function createResponse(success, error, installCount = 0, ratingCount = 0, ratingValue = 0) {
	return {
		success,
		error,
		installCount,
		ratingCount,
		ratingValue
	};
}