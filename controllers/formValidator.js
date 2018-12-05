//require email formValidator
var emailValidator = require('email-validator');
var flash = require('express-flash-messages')

function checkFormFields (req, res, next) {
  if (!req.body.email || !req.body.firstname || !req.body.lastname || !req.body.comments) {
    //req.flash("missingRequiredFields", "Please Submit All Required Fields");
    throw new Error("missingRequiredFields");
  }
  var realEmail = emailValidator.validate(req.body.email);
  if (!realEmail) {
    //req.flash('invalidemail', "This is not a valid Email Address!");
    throw new Error ("invalidemail");
  }
}

module.exports.checkFormFields = checkFormFields;
