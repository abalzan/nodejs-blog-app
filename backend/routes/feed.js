const express = require('express');
const router = express.Router();
const feedController = require('../controllers/feed');
const {body} = require('express-validator');

router.get('/posts', feedController.getPosts);
router.post('/posts',
    [
        body('title').trim().isLength({min: 5}),
        body('content').trim().isLength({min: 5})
    ],
    feedController.createPost);

router.get('/posts/:postId', feedController.getPostById)

module.exports = router;