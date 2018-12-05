var express = require('express');
var router = express.Router();
var https = require('https');
var querystring = require('querystring');
var validator = require('../controllers/formValidator.js');
var sessionData = require('../controllers/sessionData.js');
var flash = require('connect-flash');

router.use(flash());
/* GET home page. */
router.post('/', function(req, res, next) {

// add sessiondata middleware
sessionData.formData(req);
// form validator middleware
validator.checkFormFields(req, res, next);

// build the data object

var postData = querystring.stringify({
    'email': req.body.email,
    'firstname': req.body.firstname,
    'lastname': req.body.lastname,
    'comments': req.body.comments,
    'hs_context': JSON.stringify({
        "hutk": req.cookies.hubspotutk,
        "ipAddress": req.headers['x-forwarded-for'] || req.connection.remoteAddress,
        "pageUrl": "http://support.tristanlcooper.com/support",
        "pageName": "Support Request Form"
    })
});

// set the post options, changing out the HUB ID and FORM GUID variables.

var options = {
	hostname: 'forms.hubspot.com',
	path: '/uploads/form/v2/5201308/7cb5aa48-0a50-4176-9c0d-4ca652d12d9a',
	method: 'POST',
	headers: {
		'Content-Type': 'application/x-www-form-urlencoded',
		'Content-Length': postData.length
	}
}

// set up the request

var request = https.request(options, function(response){
	console.log("Status: " + response.statusCode);
	console.log("Headers: " + JSON.stringify(response.headers));
	response.setEncoding('utf8');
	response.on('data', function(chunk){
		console.log('Body: ' + chunk)
	});
});

request.on('error', function(e){
	console.log("Problem with request " + e.message)
  res.redirect('/');
});

// post the data
request.write(postData);
request.end();
res.redirect('/thankyou');

});

//catch any errors from form validator
router.use(function(error, req, res, next) {
  if (error.message == "missingRequiredFields") {
    console.error(error.message);
		req.flash("missingRequiredFields", "Please Submit All Required Fields");
		res.redirect('/');
	} else if (error.message == "invalidemail") {
    console.error(error.message);
		req.flash('invalidemail', "Please Submit a Valid Email Address");
		res.redirect('/');
	} else {
		next(err);
	}
});

module.exports = router;
