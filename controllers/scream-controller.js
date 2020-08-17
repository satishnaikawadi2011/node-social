const Scream = require('../models/scream');
const Like = require('../models/like');
const Comment = require('../models/comment');
const HttpError = require('../models/http-error');

const createScream = async (req, res, next) => {
	const { body } = req.body;
	const user = req.user;
	try {
		const scream = await Scream.create({ body, username: user.username });
		res.status(201).json({ scream });
	} catch (err) {
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const likeScream = async (req, res, next) => {
	const user = req.user;
	const screamId = req.params.id;
	try {
		const like = await Like.create({ screamId, username: user.username });
		await Scream.findOne({ _id: screamId }, async function(err, doc) {
			doc.likeCount = doc.likeCount + 1;
			await doc.save();
		});
		res.status(200).json({ like });
	} catch (err) {
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

exports.createScream = createScream;
exports.likeScream = likeScream;
