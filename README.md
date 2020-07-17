# Chrome Webstore Stats API Endpoint
This is a simple API endpoint that can be deployed which will fetch the install count, average rating, and total votes from the official Google Chrome Web Store page. 

## Setup
Run `npm install` after cloning git repo. Then simply running `node index.js`

Update port number if you wish in index.js, default is 8080. 

Endpoint will then be accessible at 

`/webstore-stats?id={extensionID}`

Providing a ID to the URL parameter will be used to then fetch the relevant stats. These are returned in JSON format as follows:
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

All code is hosted in index.js as it's a quite straight forward endpoint. 

Provided with an extension ID (32 long alpha string from end of the webstore link), the end point will extract using regex the relevant data fields and return them in JSON format. If any error occurs, error will be populated in the response. 

End point uses GET method, future plans may include a POST method for ability to return stats for multiple extensions.

An example of how to use the end point from your front-end code using AJAX:
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
