const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screamSchema = new Schema({
	body         : {
		type     : String,
		trim     : true,
		required : true
	},
	createdAt    : {
		type    : Date,
		default : Date.now()
	},
	likeCount    : {
		type    : Number,
		default : 0
	},
	commentCount : {
		type    : Number,
		default : 0
	},
	username     : {
		type     : String,
		required : true
	}
});

const Scream = mongoose.model('scream', screamSchema);

module.exports = Scream;
