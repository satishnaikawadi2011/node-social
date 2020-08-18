const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const notificationSchema = new Schema({
	type      : {
		type     : String,
		required : true
	},
	recipient : {
		type     : String,
		required : true
	},
	sender    : {
		type     : String,
		required : true
	},
	read      : {
		type    : Boolean,
		default : false
	},
	screamId  : {
		type     : mongoose.Types.ObjectId,
		required : true
	},
	createdAt : {
		type    : Date,
		default : Date.now()
	}
});

const Notification = mongoose.model('notification', notificationSchema);

module.exports = Notification;
