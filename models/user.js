const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { isEmail } = require('validator');
const Schema = mongoose.Schema;

const userSchema = new Schema(
	{
		username    : {
			type     : String,
			required : [
				true,
				' Username is required !'
			],
			unique   : true
		},
		email       : {
			type      : String,
			required  : [
				true,
				' Email is required !'
			],
			unique    : true,
			trim      : true,
			lowercase : true,
			validate  : [
				isEmail,
				'Please enter a valid email !'
			]
		},
		password    : {
			type      : String,
			required  : [
				true,
				' Password is required !'
			],
			minlength : [
				6,
				'Password must be at least 6 characters long !'
			]
		},
		userDetails : {
			type    : Object,
			default : {
				website  : '',
				bio      : '',
				mobile   : '',
				gender   : '',
				location : ''
			}
		},
		userImage   : {
			type    : String,
			default : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
		}
	},
	{
		timestamps : true
	}
);

userSchema.pre('save', async function(next) {
	// console.log(this);
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

const User = mongoose.model('user', userSchema);

module.exports = User;
