const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const deepPopulate = require('mongoose-deep-populate');

const likeSchema = new Schema({
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
	}
});

const Scream = require('../models/scream');
const Notification = require('../models/notification');

// Creating notification on liking
likeSchema.post('save', async function(doc) {
	const recipient = await Scream.findOne({ _id: doc.screamId });
	const newNotification = {
		type      : 'like',
		screamId  : doc.screamId,
		sender    : doc.username,
		recipient : recipient.username
	};

	const notification = await Notification.create(newNotification);
});

// Remove notification on undo of like
likeSchema.post('remove', async function(doc) {
	await Scream.findOne({ _id: doc.screamId }, async function(err, doc2) {
		doc2.likeCount = doc2.likeCount - 1;
		await doc2.save();
	});
	await Notification.deleteOne({ sender: doc.username, screamId: doc.screamId });
});

const Like = mongoose.model('like', likeSchema);

module.exports = Like;
