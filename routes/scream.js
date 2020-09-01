const express = require('express');
const {
	createScream,
	likeScream,
	commentOnScream,
	deleteComment,
	getAllScreams,
	getScream,
	deleteScream
} = require('../controllers/scream-controller');
const auth = require('../middlewares/auth');

const router = express.Router();

// @route  api/scream/create
// @access Private
// @desc   Creating new scream
router.post('/create', auth, createScream);

// @route  api/scream/like
// @access Private
// @desc   like a scream
router.post('/like/:id', auth, likeScream);

// @route  api/scream/comment
// @access Private
// @desc   comment on a scream
router.post('/comment/:id', auth, commentOnScream);

// @route  api/scream/comment
// @access Private
// @desc   delete a comment
router.delete('/comment/:id', auth, deleteComment);

// @route  api/scream
//TODO: @access Private
// @desc   get all screams
router.get('/', getAllScreams);

// @route  api/scream
// @access Private
// @desc   get a scream
router.get('/:id', auth, getScream);

// @route  api/scream
// @access Private
// @desc   get a scream
router.delete('/:id', auth, deleteScream);

module.exports = router;
