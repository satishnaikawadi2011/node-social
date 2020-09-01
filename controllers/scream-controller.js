const Scream = require('../models/scream');
const Like = require('../models/like');
const Comment = require('../models/comment');
const HttpError = require('../models/http-error');
const Notification = require('../models/notification');

const createScream = async (req, res, next) => {
	const { body } = req.body;
	const user = req.user;
	try {
		const scream = await Scream.create({ body, username: user.username, userImage: user.userImage });
		res.status(201).json({ scream });
	} catch (err) {
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const likeScream = async (req, res, next) => {
	const user = req.user;
	const screamId = req.params.id;
	const recipient = await Scream.findOne({ _id: screamId });
	try {
		const existingLike = await Like.find({ screamId, username: user.username });
		// console.log(existingLike);
		if (existingLike.length === 0) {
			const like = await Like.create({ screamId, username: user.username });
			if (recipient.username !== user.username) {
				const newNotification = {
					type        : 'like',
					screamId    : screamId,
					sender      : user.username,
					recipient   : recipient.username,
					senderImage : user.userImage
				};
				const notification = await Notification.create(newNotification);
			}
			await Scream.findOne({ _id: screamId }, async function(err, doc) {
				doc.likeCount = doc.likeCount + 1;
				await doc.save();
			});
			res.status(200).json({ like });
		}
		else {
			const like = await Like.findOne({ screamId });
			await like.remove();
			await Scream.findOne({ _id: screamId }, async function(err, doc2) {
				doc2.likeCount = doc2.likeCount - 1;
				await doc2.save();
			});
			if (user.username !== recipient.username) {
				await Notification.deleteOne({ sender: user.username, screamId: screamId });
			}
			res.status(200).json({ meassage: 'like removed!' });
		}
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const commentOnScream = async (req, res, next) => {
	const user = req.user;
	const screamId = req.params.id;
	const { body } = req.body;
	try {
		const scream = await Scream.findById(screamId);
		if (!scream) {
			const error = new HttpError('Scream not found !', 404);
			return next(error);
		}
		const newComment = {
			body,
			screamId,
			username  : user.username,
			userImage : user.userImage
		};
		const comment = await Comment.create(newComment);
		const recipient = await Scream.findById(screamId);
		if (recipient.username !== user.username) {
			const newNotification = {
				type        : 'comment',
				screamId    : screamId,
				sender      : user.username,
				recipient   : recipient.username,
				senderImage : user.userImage
			};
			const notification = await Notification.create(newNotification);
		}
		scream.commentCount = scream.commentCount + 1;
		scream.save();
		res.status(201).json({ comment });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const deleteComment = async (req, res, next) => {
	const user = req.user;
	const commentId = req.params.id;
	try {
		const comment = await Comment.findOne({ _id: commentId, username: user.username });
		if (!comment) {
			const error = new HttpError('No comment with this id and user !', 404);
			return next(error);
		}
		await comment.remove();
		await Scream.findOne({ _id: comment.screamId }, async function(err, doc2) {
			doc2.commentCount = doc2.commentCount - 1;
			await doc2.save();
		});
		await Notification.deleteOne({ sender: comment.username, screamId: comment.screamId });
		res.status(200).json({ message: 'Comment deleted successfully !' });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const getAllScreams = async (req, res, next) => {
	try {
		const screams = await Scream.find({});
		res.status(200).json({ screams });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const getScream = async (req, res, next) => {
	const screamId = req.params.id;
	try {
		let scream = {};
		const fetchedScream = await Scream.findById(screamId);
		if (!fetchedScream) {
			const error = new HttpError('Np scream found with this id !', 404);
			return next(error);
		}
		const comments = await Comment.find({ screamId });
		scream = {
			...fetchedScream._doc,
			comments : [
				...comments
			]
		};
		res.status(200).json({ scream });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

const deleteScream = async (req, res, next) => {
	const screamId = req.params.id;
	const user = req.user;
	try {
		const scream = await Scream.findById(screamId);
		if (!scream) {
			const error = new HttpError(`No scream found with id ${screamId}`, 404);
			return next(error);
		}
		if (scream.username != user.username) {
			const error = new HttpError('You are not allowed to delete this scream', 400);
			return next(error);
		}
		await scream.remove();
		res.status(200).json({ message: 'Scream deleted successfully !' });
	} catch (err) {
		console.log(err);
		const error = new HttpError('Something went wrong !', 500);
		return next(error);
	}
};

exports.createScream = createScream;
exports.likeScream = likeScream;
exports.commentOnScream = commentOnScream;
exports.deleteComment = deleteComment;
exports.getAllScreams = getAllScreams;
exports.getScream = getScream;
exports.deleteScream = deleteScream;
