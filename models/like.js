const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const likeSchema = new Schema(
	{
		screamId : {
			type     : mongoose.Types.ObjectId,
			required : true
		},
		username : {
			type     : String,
			required : true
		}
	},
	{
		timestamps : true
	}
);

const Like = mongoose.model('like', likeSchema);

module.exports = Like;

// const Scream = require('../models/scream');
// const Notification = require('../models/notification');

// // Creating notification on liking
// likeSchema.post('save', async function(doc) {});

// // Remove notification on undo of like
// likeSchema.post('remove', async function(doc) {});
