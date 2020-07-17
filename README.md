# Chrome Webstore Stats 
This is a simple node module used to provide details of any given chrome webstore's extension ID (32 alpha string from end of webstore link)

The following details will be provided given a valid webstore ID:
- Install Count: Number of installs the webstore listing has
- Rating Count: Number of votes cast
- Rating value: Average rating out of 5

## Setup
Run `npm install chrome-webstore-stats` to install the dependencies and module to your project.

## Usage & Example
Using async/awaits:
```javascript
const chromeStoreStats = require('chrome-webstore-stats');
var extensionID = "gkkmiofalnjagdcjheckamobghglpdpm";

var data = await chromeStoreStats(extensionID);

if (data.error) {
	console.log(data);
}

console.log(data);

```

Using promises:
```javascript
const chromeStoreStats = require('chrome-webstore-stats');
var extensionID = "gkkmiofalnjagdcjheckamobghglpdpm";

chromeStoreStats(extensionID).then(function(data) {
	if (data.error) {
		console.log(data);
	}

	console.log(data);
});

```

Data will be returned in the following JSON format. These are returned in JSON format as follows:
```
{
	success: true/false,
	error: false/"string explaining what went wrong",
	installCount: "Number of installs",
	ratingCount: "Number of votes",
	ratingValue: "Average star rating out of 5"
}
```

## Approach

All code is hosted in index.js as it's a quite straight forward function. 

Provided with an extension ID (32 long alpha string from end of the webstore link), the end point will extract using regex the relevant data fields and return them in JSON format. If any error occurs, error will be populated in the response. 

To use as an endpoint, have a look at this endpoint example at https://github.com/navi1995/Chrome-Webstore-Stats-API

```javascript
function getChromeStoreDetails() {
	$.ajax({
		url: '/webstore-stats?id={extensionID}',
		method: 'GET',
		contentType: 'application/json; charset=utf-8',
		dataType: 'json'
	}).done(function (data, textStatus, jqXHR) {
		if (data.installCount) $("#installCount").html(data.installCount);
		if (data.ratingValue) $("#ratingValue").html(Math.round((data.ratingValue + Number.EPSILON) * 100) / 100);
		if (data.ratingCount) $("#ratingCount").html(data.ratingCount); 
	});
}
```
