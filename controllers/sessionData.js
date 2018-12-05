var session = require('express-session');

function formData (req) {
    req.session.firstname = req.body.firstname;
    req.session.lastname = req.body.lastname;
    req.session.email = req.body.email;
    req.session.comments = req.body.comments;
    console.log(req.session.firstname);
}

module.exports.formData = formData;
