'use strict';

var nodemailer = require("nodemailer");
var config = require('../conf/config');

var mailHelper = (function() {

	var smtpTransport = nodemailer.createTransport(config.mail);

	return {
		sendMail: function(to, subject, html) {

			var mailOptions = {
		        from: config.mail.auth.user,
		          to: to,
		     subject: subject,
		        html: html
		    };

			smtpTransport.sendMail(mailOptions, function(error, response){
		        if (error) {
		            console.log(error);
		        } else {
		            console.log('Message sent: ' + response.message);
		        }
		        smtpTransport.close();
		    });
		}
	};
})();

module.exports = mailHelper;