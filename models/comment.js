const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
