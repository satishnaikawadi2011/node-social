const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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

const Like = mongoose.model('like', likeSchema);

module.exports = Like;
