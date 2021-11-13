const express = require('express');
const router = express.Router();

const userController = require('../controller/userController');
const postController = require('../controller/postController');
const commentController = require('../controller/commentController');

router.get('/', userController.homePage)
router.post('/register', userController.newUser);
router.post('/login', userController.loginUser);
router.get('/logout', userController.logoutUser);
router.get('/latestPosts', postController.latestPosts);
router.post('/deletePost/:id', postController.deletePost);

router.post('/newPost', postController.newPost);
router.get('/myPosts', postController.myPosts);

router.get('/users', userController.allUsers);

router.get('/posts', postController.allPosts);
router.get('/allPosts', postController.allPostsFromAdmin);
router.get('/post/:id', postController.viewPost);

router.post('/addComment', commentController.addComment);
router.get('/comments/:id', commentController.allComments);


module.exports = router;