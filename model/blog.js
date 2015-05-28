var Schema = require('mongoose').Schema;
var ObjectId = Schema.ObjectId;
var logger = require('log4js').getLogger(__filename);

var BlogScheme = new Schema({
   title :  { type: String },
   author:  { type: String },
    body :  { type: String },
 comments:  [{ body: String, date: Date }],
	 date:  { type: Date, default: Date.now },
   hidden:  Boolean,
	 meta:  {
	    votes: Number,
	    favs:  Number
	 }
});

BlogScheme.methods.speak = function() {
	var greeting = this.title ? "Meow name is " + this.title : "I don't have a name";
	logger.info(greeting);
};

module.exports = BlogScheme;