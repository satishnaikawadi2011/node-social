const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const screamSchema = new Schema(
	{
		body         : {
			type     : String,
			trim     : true,
			required : true
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
		},
		userImage    : {
			type     : String,
			required : true
		}
	},
	{ timestamps: true }
);

const Comment = require('./comment');
const Like = require('./like');
const Notification = require('./notification');

screamSchema.post('remove', async function(doc, next) {
	await Comment.deleteMany({ screamId: doc._id });
	await Like.deleteMany({ screamId: doc._id });
	await Notification.deleteMany({ screamId: doc._id });
	next();
});

const Scream = mongoose.model('scream', screamSchema);

module.exports = Scream;
