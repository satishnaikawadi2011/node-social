const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate');

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

const Comment = require('./comment');
const Like = require('./like');

screamSchema.post('remove', async function(doc, next) {
	await Comment.deleteMany({ screamId: doc._id });
	await Like.deleteMany({ screamId: doc._id });
	next();
});

const Scream = mongoose.model('scream', screamSchema);

module.exports = Scream;
