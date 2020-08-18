const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate');

const commentSchema = new Schema({
	screamId  : {
		type     : mongoose.Types.ObjectId,
		required : true
	},
	createdAt : {
		type    : Date,
		default : Date.now()
	},
	username  : {
		type     : String,
		required : true
	},
	body      : {
		type     : String,
		required : true,
		trim     : true
	}
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;

// const Scream = require('../models/scream');
// const Notification = require('../models/notification');

// // Creating notification on commenting
// commentSchema.post('save', async function(doc) {});

// // Remove notification on deleting comment
// commentSchema.post('remove', async function(doc) {});
