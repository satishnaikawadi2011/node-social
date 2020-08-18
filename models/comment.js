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

const Scream = require('../models/scream');
const Notification = require('../models/notification');

// Creating notification on commenting
commentSchema.post('save', async function(doc) {
	const recipient = await Scream.findById(doc.screamId);
	const newNotification = {
		type      : 'comment',
		screamId  : doc.screamId,
		sender    : doc.username,
		recipient : recipient.username
	};

	const notification = await Notification.create(newNotification);
});

// Remove notification on deleting comment
commentSchema.post('remove', async function(doc) {
	await Scream.findOne({ _id: doc.screamId }, async function(err, doc2) {
		doc2.commentCount = doc2.commentCount - 1;
		await doc2.save();
	});
	await Notification.deleteOne({ sender: doc.username, screamId: doc.screamId });
});

const Comment = mongoose.model('comment', commentSchema);

module.exports = Comment;
