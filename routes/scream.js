const express = require('express');
const { createScream, likeScream } = require('../controllers/scream-controller');
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

module.exports = router;
