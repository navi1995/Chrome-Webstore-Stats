const it = require('mocha').it;
const assert = require('chai').assert;
const chromeStoreStats = require('../index.js');

it("Existing ID Check", async function() {
	var data = await chromeStoreStats('gkkmiofalnjagdcjheckamobghglpdpm');
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, true);
	assert.equal(data.error, false);
	assert.equal(data.name, 'YouTube Windowed FullScreen');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
});

it("Multiple ID array check", async function() {
	this.timeout(6000);
	var data = await chromeStoreStats(['gkkmiofalnjagdcjheckamobghglpdpm', 'gkkmiofalnjagdcjheckamobghglpdpz', 'cfidkbgamfhdgmedldkagjopnbobdmdn']);
	
	assert.typeOf(data, 'object');
	assert.lengthOf(Object.keys(data), 3);

	var e1 = data['gkkmiofalnjagdcjheckamobghglpdpm'];
	var e2 = data['gkkmiofalnjagdcjheckamobghglpdpz'];
	var e3 = data['cfidkbgamfhdgmedldkagjopnbobdmdn'];

	assert.equal(e1.success, true);
	assert.equal(e1.error, false);
	assert.equal(e1.name, 'YouTube Windowed FullScreen');
	assert.typeOf(e1.installCount, 'number');
	assert.typeOf(e1.ratingCount, 'number');
	assert.typeOf(e1.ratingValue, 'number');

	assert.equal(e2.success, false);
	assert.equal(e2.error, 'Couldn\'t find extension with ID gkkmiofalnjagdcjheckamobghglpdpz');
	assert.equal(e2.name, '');
	assert.typeOf(e2.installCount, 'number');
	assert.typeOf(e2.ratingCount, 'number');
	assert.typeOf(e2.ratingValue, 'number');
	assert.equal(e2.installCount, 0);
	assert.equal(e2.ratingCount, 0);
	assert.equal(e2.ratingValue, 0);

	assert.equal(e3.success, true);
	assert.equal(e3.error, false);
	assert.equal(e3.name, 'Social Blade');
	assert.typeOf(e3.installCount, 'number');
	assert.typeOf(e3.ratingCount, 'number');
	assert.typeOf(e3.ratingValue, 'number');
});

it("Empty instantiation", async function() {
	var data = await chromeStoreStats();
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, false);
	assert.equal(data.error, 'Invalid extension ID.');
	assert.equal(data.name, '');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
	assert.equal(data.installCount, 0);
	assert.equal(data.ratingCount, 0);
	assert.equal(data.ratingValue, 0);
});

it("Null instantiation", async function() {
	var data = await chromeStoreStats(null);
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, false);
	assert.equal(data.error, 'Invalid extension ID.');
	assert.equal(data.name, '');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
	assert.equal(data.installCount, 0);
	assert.equal(data.ratingCount, 0);
	assert.equal(data.ratingValue, 0);
});

it("Undefined instantiation", async function() {
	var data = await chromeStoreStats(undefined);
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, false);
	assert.equal(data.error, 'Invalid extension ID.');
	assert.equal(data.name, '');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
	assert.equal(data.installCount, 0);
	assert.equal(data.ratingCount, 0);
	assert.equal(data.ratingValue, 0);
});

it("Numbers only extension ID", async function() {
	var data = await chromeStoreStats(3409);
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, false);
	assert.equal(data.error, 'Invalid extension ID.');
	assert.equal(data.name, '');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
	assert.equal(data.installCount, 0);
	assert.equal(data.ratingCount, 0);
	assert.equal(data.ratingValue, 0);
});

it("Empty string instantiation", async function() {
	var data = await chromeStoreStats('3409');
	
	assert.typeOf(data, 'object');
	assert.equal(data.success, false);
	assert.equal(data.error, 'Invalid extension ID.');
	assert.equal(data.name, '');
	assert.typeOf(data.installCount, 'number');
	assert.typeOf(data.ratingCount, 'number');
	assert.typeOf(data.ratingValue, 'number');
	assert.equal(data.installCount, 0);
	assert.equal(data.ratingCount, 0);
	assert.equal(data.ratingValue, 0);
});