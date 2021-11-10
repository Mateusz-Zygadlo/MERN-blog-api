const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController');


router.post('/register', userController.newUser);
router.post('/login', userController.loginUser)

router.get('/users', userController.allUsers);

router.get('/posts', postController.allPosts);
router.get('/comments', commentController.allComments);


module.exports = router;