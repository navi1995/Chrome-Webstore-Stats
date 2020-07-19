const fetch = require('node-fetch');
//Credit to https://github.com/petasittek/chrome-web-store-stats/ for regex below
const URL_PREFIX = 'https://chrome.google.com/webstore/detail/';
const REGEX_NAME = '<meta itemprop="name" content="([^"]*)"/>';
const REGEX_INSTALL_COUNT = '<Attribute name="user_count">([0-9]*)</Attribute>';
const REGEX_RATING_COUNT = '<meta itemprop="ratingCount" content="([0-9]*)"/>';
const REGEX_RATING_VALUE = '<meta itemprop="ratingValue" content="([0-9.]*)"/>';
//Credit to https://github.com/petasittek/chrome-web-store-stats/ for regex above
const REGEX_EXTENSIONID = /[a-z]{32}$/;

module.exports = async function(inputIDs) {
	var extensionIDs = [].concat(inputIDs);
	var responses = {};

	for (var i = 0, l = extensionIDs.length; i < l; i++) {
		var extensionID = extensionIDs[i];

		if (typeof extensionID != "string" || !REGEX_EXTENSIONID.test(extensionID.toLowerCase())) {
			responses[extensionID] = createResponse(false, 'Invalid extension ID.');

			continue;
		}
		
		try {
			const response = await fetch(`${URL_PREFIX}${extensionID}`); 
			const data = await response.text();
			const name = data.match(REGEX_NAME)[1] || ''; //For future if multiple ID's?
			const installCount = parseInt(data.match(REGEX_INSTALL_COUNT)[1]) || 0;
			const ratingCount = parseInt(data.match(REGEX_RATING_COUNT)[1]) || 0;
			const ratingValue = parseFloat(data.match(REGEX_RATING_VALUE)[1]) || 0;

			responses[extensionID] = createResponse(true, false, name, installCount, ratingCount, ratingValue);

			continue;
		} catch (e) {
			responses[extensionID] = createResponse(false, `Couldn't find extension with ID ${extensionID}`);

			continue;
		}
	}

	return extensionIDs.length <= 1 ? responses[extensionIDs[0]] : responses;
}

function createResponse(success, error, name = '', installCount = 0, ratingCount = 0, ratingValue = 0) {
	return {
		success,
		error,
		name,
		installCount,
		ratingCount,
		ratingValue
	};
}